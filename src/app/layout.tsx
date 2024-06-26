import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/shadcn-ui/utils";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-[100vh] bg-white text-slate-800 dark:bg-slate-800 dark:text-white`
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
