import { Toaster } from "sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import StacksWalletProvider from "@/components/StacksWalletProvider";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import PwaRegister from "@/components/PwaRegister";

export const metadata: Metadata = {
  metadataBase: new URL("https://stacksai.xyz"),
  title: "StacksAI - Talk to Bitcoin",
  description: "Talk to Bitcoin. Access the entire Bitcoin DeFi ecosystem through conversation. Trade on ALEX, Velar, BitFlow. Lend on Arkadiko, Granite. Stack for Bitcoin yields - just by talking.",
};

export const viewport = {
  maximumScale: 1,
  themeColor: "#5546FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-app-bg text-text-main grid-subtle selection:bg-accent-indigo/10 selection:text-accent-indigo">
        <StacksWalletProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <Toaster position="top-center" richColors closeButton />
            <OnboardingTutorial />
            <PwaRegister />
            {children}
          </ThemeProvider>
        </StacksWalletProvider>
      </body>
    </html>
  );
}
