import ChatBotIframe from "./chatbot-iframe";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head></head>
      <body>
        <main>{children}</main>
        <ChatBotIframe />
      </body>
    </html>
  );
}
