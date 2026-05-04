"use server";
import { SignJWT, jwtVerify } from 'jose'
import { client } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { onGetAllAccountDomains } from "../settings";

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const COOKIE_NAME = "auth-token";
const generateTokenAndSetCookie = async (userId: string, email: string) => {
  const token = await new SignJWT({ userId, email })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('7d')
  .sign(secret)

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return token;
};

// Get current user from JWT token
export const getCurrentUser = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

   const { payload } = await jwtVerify(token, secret)

    const user = await client.user.findUnique({
      where: { id: payload.userId as string},
      select: {
        id: true,
        fullname: true,
        email: true,
        type: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

// Register new user
export const onCompleteUserRegistration = async (
  fullname: string,
  email: string,
  password: string,
  type: string
) => {
  try {
    // Check if user already exists
    const existingUser = await client.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists", status: 409 };
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const registered = await client.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        email: true,
        type: true,
      },
    });
    if (registered) {
      // Generate token and set cookie
      await generateTokenAndSetCookie(registered.id, registered.email);
      
      return { status: 200, user: registered };
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    return { error, status: 400 };
  }
};

// Login user
export const onLoginUser = async (email: string, password: string) => {
  try {
    const user = await client.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullname: true,
        email: true,
        password: true,
        type: true,
      },
    });
    console.log('User found:', user);
    if (!user) {
      return { error: "Invalid credentials", status: 401 };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return { error: "Invalid credentials", status: 401 };
    }

    // Generate token and set cookie
    await generateTokenAndSetCookie(user.id, user.email);

    const domains = await onGetAllAccountDomains();

    return {
      status: 200,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        type: user.type,
      },
      domains: domains?.domains,
    };
  } catch (error) {
    console.error('Error during user login:', error);
    return { error: "Login failed", status: 500 };
  }
};

// Auto-login (check existing session)
export const onAutoLogin = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    return { status: 401, error: "Not authenticated" };
  }

  try {
    const domains = await onGetAllAccountDomains();
    return { status: 200, user, domains: domains?.domains };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch user data", status: 500 };
  }
};

// Logout user
export const onLogoutUser = async () => {
  cookies().delete(COOKIE_NAME);
  redirect("/auth/sign-in");
};

// Middleware helper to protect routes
export const requireAuth = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return user;
};