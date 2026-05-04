"use server";
import { client } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getCurrentUser } from "../auth";

export const onGetAllCustomers = async (email: string) => {
  try {
    const customers = await client.user.findUnique({
      where: {
        email: email,
      },
      select: {
        subscription: {
          select: {
            credits: true,
            plan: true,
          },
        },
        domains: {
          select: {
            customer: {
              select: {
                id: true,
                email: true,
                Domain: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (customers) {
      return customers;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllCampaigns = async (email: string) => {
  try {
    const campaigns = await client.user.findUnique({
      where: {
        email: email,
      },
      select: {
        campaign: {
          select: {
            name: true,
            id: true,
            customers: true,
            createdAt: true,
          },
        },
      },
    });
    if (campaigns) {
      return campaigns;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateMarketingCampaign = async (name: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    const campaign = await client.user.update({
      where: {
        email: user.email,
      },
      data: {
        campaign: {
          create: {
            name,
          },
        },
      },
    });
    if (campaign) {
      return { status: 200, message: "New Campaign created successfully !" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const onSaveEmailTemplate = async (
  template: string,
  campaignId: string
) => {
  try {
    const newTemplate = await client.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        template,
      },
    });
    if (newTemplate) {
      return { status: 200, message: "Email template saved successfully !" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onAddCustomersToEmail = async (
  customers: string[],
  id: string
) => {
  try {
    console.log(customers, id);
    const customerAdd = await client.campaign.update({
      where: {
        id,
      },
      data: {
        customers,
      },
    });

    if (customerAdd) {
      return { status: 200, message: "Customer added to campaign" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onBulkMailer = async (email: string[], campaignId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    //get the template for this campaign
    const template = await client.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        name: true,
        template: true,
      },
    });

    if (template && template.template) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODE_MAILER_EMAIL,
          pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        to: email,
        subject: template.name,
        text: JSON.parse(template.template),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const creditsUsed = await client.user.update({
        where: {
          email: user.email,
        },
        data: {
          subscription: {
            update: {
              credits: { decrement: email.length },
            },
          },
        },
      });
      if (creditsUsed) {
        return { status: 200, message: "Campaign emails sent" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllCustomerResponses = async (id: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    const answers = await client.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        domains: {
          select: {
            customer: {
              select: {
                questions: {
                  where: {
                    customerId: id,
                    answered: {
                      not: null,
                    },
                  },
                  select: {
                    question: true,
                    answered: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (answers) {
      return answers.domains;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetEmailTemplate = async (id: string) => {
  try {
    const template = await client.campaign.findUnique({
      where: {
        id,
      },
      select: {
        template: true,
      },
    });

    if (template) {
      return template.template;
    }
  } catch (error) {
    console.log(error);
  }
};
