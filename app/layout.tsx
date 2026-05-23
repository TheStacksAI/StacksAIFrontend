import { Toaster } from "sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import StacksWalletProvider from "@/components/StacksWalletProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://stacksai.xyz"),
  title: "StacksAI - Talk to Bitcoin",
  description: "Talk to Bitcoin. Access the entire Bitcoin DeFi ecosystem through conversation. Trade on ALEX, Velar, BitFlow. Lend on Arkadiko, Granite. Stack for Bitcoin yields - just by talking.",
};

export const viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-app-bg text-text-main grid-subtle selection:bg-accent-indigo/10 selection:text-accent-indigo">
        <StacksWalletProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <Toaster position="top-center" />
            {children}
          </ThemeProvider>
        </StacksWalletProvider>
      </body>
    </html>
  );
}
