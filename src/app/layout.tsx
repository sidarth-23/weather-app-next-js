import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/next-theme";
import dynamic from "next/dynamic";

import "./globals.css";
import { cn } from "@/lib/utils";

import Sidebar from "@/components/own-ui/sidebar";
import { ModeToggle } from "@/components/own-ui/theme-toggler";
const TimeDisplay = dynamic(() => import("@/components/own-ui/time"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          `${inter.className}`,
          `flex min-h-screen flex-col antialiased`
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex gap-4 min-h-lvh">
            <div className="fixed bottom-6 right-5">
              <ModeToggle />
            </div>
            <Sidebar />
            <div className="p-2 md:p-4 pl-0 w-full">
              <TimeDisplay />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
