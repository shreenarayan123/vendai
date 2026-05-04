import { client } from "@/lib/prisma";
import Stripe from "stripe";
import { getCurrentUser } from "../auth";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const onCreateCustomerPaymentIntent = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentsIntent = await stripe.paymentIntents.create(
      {
        currency: "usd",
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
        description: "Software product purchase", 
        shipping: {
          name: "Sunny",
          address: {
            line1: "123 Street",
            city: "Mumbai",
            postal_code: "12345",
            state: "Maharashtra",
            country: "IN"
          }
        },
      },
      {
        stripeAccount: stripeId,
      }
    );
    if (paymentsIntent) {
      return paymentsIntent.client_secret;
    }
  } catch (error) {
    console.log(error);
  }
};
export const onUpdateSubscriptionPlan = async (
  plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const update = await client.user.update({
      where: {
        email: user.email,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: plan == "PRO" ? 50 : plan == "ULTIMATE" ? 500 : 10,
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (update) {
      return {
        status: 200,
        message: "Subscription plan updated successfully",
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
const setPlanAmount = (item: "STANDARD" | "PRO" | "ULTIMATE") => {
  if (item == "PRO") {
    return 1500;
  }
  if (item == "ULTIMATE") {
    return 3500;
  }
  return 0;
};
export const onGetStripeClientSecret = async (
  item: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const amount = setPlanAmount(item);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};
