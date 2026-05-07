"use server";
import { getCurrentUser } from "../auth";

export const getUserClients = async () => {
  try {
    const user = await getCurrentUser();
    if (user) {
      const { client } = await import("@/lib/prisma");
      const clients = await client.customer.count({
        where: {
          Domain: {
            User: {
              email: user.email,
            },
          },
        },
      });
      if (clients) {
        return clients;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlanInfo = async () => {
  try {
    const user = await getCurrentUser();
    if (user) {
      const { client } = await import("@/lib/prisma");
      const plan = await client.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          _count: {
            select: {
              domains: true,
            },
          },
          subscription: {
            select: {
              plan: true,
              credits: true,
            },
          },
        },
      });
      if (plan) {
        return {
          plan: plan?.subscription?.plan,
          credits: plan?.subscription?.credits,
          domains: plan?._count?.domains,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
