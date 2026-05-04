import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
   metadataBase: new URL('https://vendai.live'),
  title: "Vend AI - AI-Powered Customer Support Platform",
  description: "Transform your customer engagement with Vend AI's intelligent chatbot platform. Add a fully customizable AI assistant to your website in just three simple steps.",
  openGraph: {
    title: "Vend AI - AI-Powered Customer Support Platform",
    description: "Transform your customer engagement with Vend AI's intelligent chatbot platform. Add a fully customizable AI assistant to your website in just three simple steps.",
    url: "https://vendai.live",
    siteName: "Vend AI",
    images: [
      {
        url: "/assets/landingPage.png",
        width: 1200,
        height: 630,
        alt: "Vend AI - AI-Powered Customer Support Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vend AI - AI-Powered Customer Support Platform",
    description: "Transform your customer engagement with Vend AI's intelligent chatbot platform. Add a fully customizable AI assistant to your website in just three simple steps.",
    images: ["/assets/landingPage.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
  );
}
