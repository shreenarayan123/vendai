"use server";

import { client } from "@/lib/prisma";
import { getCurrentUser } from "../auth";

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await getCurrentUser();
  if (!user) return;
  try {
    const subscription = await client.user.findUnique({
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
          },
        },
      },
    });
    const domainExists = await client.user.findFirst({
      where: {
        email: user.email,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == "STANDARD" &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == "PRO" &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == "ULTIMATE" &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await client.user.update({
          where: {
            email: user.email,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: "Hey there, have  a question? Text us here",
                  },
                },
              },
            },
          },
        });

        if (newDomain) {
          return { status: 200, message: "Domain successfully added" };
        }
      }
      return {
        status: 400,
        message:
          "You've reached the maximum number of domains, upgrade your plan",
      };
    }
    return {
      status: 400,
      message: "Domain already exists",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await getCurrentUser();
  if (!user) return;
  try {
    const domains = await client.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    console.log(error);
  }
};

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const plan = await client.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdatePassword = async (password: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const updatedPassword = await client.user.update({
      where: {
        email: user.email,
      },
      data: {
        password,
      },
    });
    if (updatedPassword) {
      return { status: 200, message: "Password updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetCurrentDomainInfo = async (domain: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const domainInfo = await client.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (domainInfo) {
      return domainInfo;
    }
  } catch (error) {
    console.log(error);
  }
};
export const onUpdateDomain = async (name: string, id: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const domainExists = await client.domain.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });
    if (!domainExists) {
      const updatedDomain = await client.domain.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      if (updatedDomain) {
        return { status: 200, message: "Domain updated" };
      }
      return { status: 400, message: "oops something went wrong" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const onChatBotImageUpdate = async (id: string, icon: string) => {
  const user = await getCurrentUser();

  if (!user) return;
  try {
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            },
          },
        },
      },
    });
    if (domain) {
      return { status: 200, message: "Chatbot updated" };
    }
    return {
      status: 400,
      message: "oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};
export const onUpdateWelcomeMessage = async (
  message: string,
  domainId: string
) => {
  try {
    const update = await client.domain.update({
      where: {
        id: domainId,
      },
      data: {
        chatBot: {
          update: {
            data: {
              welcomeMessage: message,
            },
          },
        },
      },
    });
    if (update) {
      return { status: 200, message: "Welcome message updated" };
    }
  } catch (error) {
    console.log(error);
  }
};
export const onDeletUserDomain = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) return;

  try {
    const validUser = await client.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
      },
    });
    if (validUser) {
      const deletedDomain = await client.domain.delete({
        where: {
          userId: validUser.id,
          id,
        },
        select: {
          name: true,
        },
      });
      if (deletedDomain) {
        return {
          status: 200,
          message: `${deletedDomain.name} was deleted successfully`,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateCompanyInfo = async (id: string, info: string[]) => {
  try {
    const companyData = await client.domain.update({
      where: {
        id: id,
      },
      data: {
        domainInfo: info,
      },
      select: {
        domainInfo: true,
      },
    });
    if (companyData) {
      return {
        status: 200,
        message: "Company info updated successfully",
        data: companyData.domainInfo,
      };
    }
    return {
      status: 400,
      message: "Oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};
export const onDeleteCompanyInfo = async (index: number, id: string) => {
  try {
    const currentDomain = await client.domain.findUnique({
      where: { id },
      select: { domainInfo: true },
    });

    if (!currentDomain) {
      return {
        status: 404,
        message: "Domain not found",
      };
    }
    const updatedDomainInfo = currentDomain.domainInfo.filter(
      (_, i) => i !== index
    );
    const updatedDomain = await client.domain.update({
      where: { id },
      data: {
        domainInfo: updatedDomainInfo,
      },
    });

    return {
      status: 200,
      message: "Company info deleted successfully",
      data: updatedDomain.domainInfo,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while deleting company info",
    };
  }
};
export const onGetAllCompanyInfo = async (id: string) => {
  try {
    const allCompanyInfo = await client.domain.findUnique({
      where: {
        id: id,
      },
      select: {
        domainInfo: true,
      },
    });
    if (allCompanyInfo) {
      return {
        status: 200,
        message: "Company info fetched successfully",
        data: allCompanyInfo.domainInfo,
      };
    }
    return {
      status: 400,
      message: "Oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onCreateFilterQuestions = async (id: string, question: string) => {
  try {
    const filterQuestions = await client.domain.update({
      where: {
        id,
      },

      data: {
        filterQuestions: {
          create: {
            question,
          },
        },
      },
      include: {
        filterQuestions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });
    if (filterQuestions) {
      return {
        status: 200,
        message: "New Filter Question Created",
        questions: filterQuestions.filterQuestions,
      };
    }
    return {
      status: 400,
      message: "Oops something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllFilterQuestions = async (id: string) => {
  try {
    const filterQuestions = await client.filterQuestions.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        id: true,
      },
      orderBy: {
        question: "asc",
      },
    });
    return {
      status: 200,
      questions: filterQuestions,
      message: "Filter Questions added successfully",
    };
  } catch (error) {
    console.log(error);
  }
};
export const onDeleteFilterQuestion = async (index: number, id: string) => {
  try {
    const currentDomain = await client.domain.findUnique({
      where: { id },
      select: { filterQuestions: true },
    });

    if (!currentDomain) {
      return {
        status: 404,
        message: "Domain not found",
      };
    }
    const updatedDomainInfo = currentDomain.filterQuestions
      .filter((_, i) => i !== index)
      .map((filterQuestion) => ({
        id: filterQuestion.id,
        question: filterQuestion.question,
      }));
    const updatedDomain = await client.domain.update({
      where: { id },
      data: {
        filterQuestions: {
          updateMany: updatedDomainInfo.map((filterQuestion) => ({
            where: { id: filterQuestion.id },
            data: { question: filterQuestion.question },
          })),
        },
      },
      select: {
        filterQuestions: true,
      },
    });

    return {
      status: 200,
      message: "Company info deleted successfully",
      data: updatedDomain.filterQuestions,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while deleting company info",
    };
  }
};

export const onGetPaymentConnected = async () => {
  try {
    const user = await getCurrentUser();
    if (user) {
      const connected = await client.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          stripeId: true,
        },
      });
      if (connected) {
        return connected.stripeId;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
