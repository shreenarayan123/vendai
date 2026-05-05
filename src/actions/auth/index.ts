"use server";

const COOKIE_NAME = "auth-token";

async function generateTokenAndSetCookie(userId: string, email: string) {
  const { SignJWT } = await import('jose');
  const { cookies } = await import('next/headers');
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret as any);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return token;
}

// Get current user from JWT token
export const getCurrentUser = async () => {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const { jwtVerify } = await import('jose');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret as any);

    const { client } = await import('@/lib/prisma');

    const user = await client.user.findUnique({
      where: { id: payload.userId as string },
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
    const { client } = await import('@/lib/prisma');
    const bcrypt = (await import('bcrypt')).default;

    // Check if user already exists
    const existingUser = await client.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: 'User already exists', status: 409 };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const registered = await client.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        type,
        subscription: { create: {} },
      },
      select: { fullname: true, id: true, email: true, type: true },
    });

    if (registered) {
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
    const { client } = await import('@/lib/prisma');
    const bcrypt = (await import('bcrypt')).default;

    const user = await client.user.findUnique({
      where: { email },
      select: { id: true, fullname: true, email: true, password: true, type: true },
    });

    if (!user) return { error: 'Invalid credentials', status: 401 };

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return { error: 'Invalid credentials', status: 401 };

    await generateTokenAndSetCookie(user.id, user.email);

    const { onGetAllAccountDomains } = await import('../settings');
    const domains = await onGetAllAccountDomains();

    return {
      status: 200,
      user: { id: user.id, fullname: user.fullname, email: user.email, type: user.type },
      domains: domains?.domains,
    };
  } catch (error) {
    console.error('Error during user login:', error);
    return { error: 'Login failed', status: 500 };
  }
};

// Auto-login (check existing session)
export const onAutoLogin = async () => {
  const user = await getCurrentUser();

  if (!user) return { status: 401, error: 'Not authenticated' };

  try {
    const { onGetAllAccountDomains } = await import('../settings');
    const domains = await onGetAllAccountDomains();
    return { status: 200, user, domains: domains?.domains };
  } catch (error) {
    console.log(error);
    return { error: 'Failed to fetch user data', status: 500 };
  }
};

// Logout user
export const onLogoutUser = async () => {
  const { cookies } = await import('next/headers');
  const { redirect } = await import('next/navigation');
  cookies().delete(COOKIE_NAME);
  redirect('/auth/sign-in');
};

// Middleware helper to protect routes
export const requireAuth = async () => {
  const user = await getCurrentUser();
  if (!user) {
    const { redirect } = await import('next/navigation');
    redirect('/auth/sign-in');
  }
  return user;
};