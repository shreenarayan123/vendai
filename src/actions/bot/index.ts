"use server";

import { client } from "@/lib/prisma";
import { extractEmailsFromString, extractURLfromString } from "@/lib/utils";
import { onRealTimeChat } from "../conversation";
import { onMailer } from "../mailer";
import OpenAI from "openai";
import { getCurrentUser } from "../auth";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_AI_KEY,
});
const formQuestions = [
  { question: 'Spill the tea — what’s this appointment for?" ☕' },
  { question: "Got something in mind? Let us know!" },
];

export const onStoreConversations = async (
  id: string,
  message: string,
  role: "assistant" | "user"
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
          },
        },
      },
    });

    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};

let customerEmail: string | undefined;

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: "assistant" | "user"; content: string }[],
  author: "user",
  message: string
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          select: {
            question: true,
          },
        },
        domainInfo: true,
      },
    });
    if (chatBotDomain) {
      console.log(chatBotDomain.filterQuestions, "chatbot filter questions");
      const extractedEmail = extractEmailsFromString(message);
      if (extractedEmail) {
        customerEmail = extractedEmail[0];
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                email: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: formQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });
          if (newCustomer) {
            console.log("new customer made");
            const response = {
              role: "assistant",
              content: `Welcome aboard ${
                customerEmail.split("@")[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            };
            return { response };
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          );

          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            "user",
            author
          );

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await getCurrentUser();
            if (!user) {
              throw new Error("User not found");
            }
            console.log("sending email to user", user.email);

            onMailer(user.email, checkCustomer.customer[0].email);

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        );
        const chatCompletion = await openai.chat.completions.create({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "assistant",
              content: `
                You will get an array of questions that you must ask the customer. 
                
                Progress the conversation using those questions. 
                
                Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
                
                Do not forget it.
  
                only add this keyword when your asking a question from the array of questions. No other question satisfies this condition
  
                Always maintain character and stay respectfull.
  
                The array of questions : [${chatBotDomain.filterQuestions
                  .map((questions) => questions.question)
                  .join(", ")}]
                    
                if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.
                if the customer is not satisfied with the conversation or with your answers just simply say THE TEAM WILL REACH OUT TO YOU JUST DROP YOUR EMAIL HERE.
                TO GET REAL-USER SUPPORT JUST DROP YOUR EMAIL HERE.
                if the customer agrees to book an appointment JUST SEND THEM LINK DONT ASK FURTHER QUESTIONS JUST SEND THEM THIS LINK http://localhost:3000/portal/${id}/appointment/${
                checkCustomer?.customer[0].id
              } 
  
            `,
            },
            ...chat,
            {
              role: "user",
              content: message,
            },
          ],
          // model: 'gpt-4o-mini',
        });
        console.log(
          chatCompletion.choices[0].message.content,
          "chatCompletion"
        );
        if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: "assistant",
              content: chatCompletion.choices[0].message.content.replace(
                "(realtime)",
                ""
              ),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              "assistant"
            );

            return { response };
          }
        }
        if (chat[chat.length - 1].content.includes("(complete)")) {
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: "asc",
              },
            });
          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          );

          if (generatedLink) {
            const link = generatedLink[0];
            const validateAndFixUUID = (link: string) => {
              const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

              const parts = link.split("/");
              const lastPart = parts[parts.length - 1];
              if (!uuidRegex.test(lastPart)) {
                const correctUUID = checkCustomer?.customer[0].id;
                if (correctUUID) {
                  parts[parts.length - 1] = correctUUID;
                }
                return parts.join("/");
              }

              return link;
            };
            const fixedLink = validateAndFixUUID(link);

            const response = {
              role: "assistant",
              content: `Great! you can follow the link to proceed`,
              link: fixedLink,
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              "assistant"
            );

            return { response };
          }

          const response = {
            role: "assistant",
            content: chatCompletion.choices[0].message.content,
          };

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            "assistant"
          );

          return { response };
        }
      }
      const chatCompletion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "assistant",
            content: `
              You are a personable sales representative for ${chatBotDomain.name}. Engage customers naturally, understand their needs, and guide them toward appropriate products/services. 

Begin with a brief, warm welcome.  Reference ${chatBotDomain.domainInfo} to answer questions about the business or platform.

During the conversation, naturally obtain the customer's email address while staying in character. Keep responses short.

Write as a human would: straightforward, simple language with natural phrasing.  Use occasional emojis to add warmth and personality. Only provide longer responses when the situation truly requires it.  
dont send texts in bold          `,
          },
          ...chat,
          {
            role: "user",
            content: message,
          },
        ],
        // model: 'gpt-4o-mini',
      });

      if (chatCompletion) {
        const response = {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        };

        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
