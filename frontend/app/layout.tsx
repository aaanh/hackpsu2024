import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/NavBar";
import UploadForm from "@/components/UploadForm";
import connectDB from "@/utils/database";

connectDB();

// either Static metadata
export const metadata: Metadata = {
  title: "Can't Cheat with This",
  description:
    "We're totally not directly touching transformers in another AI/ML/NN application!!??!!"
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={cn(
            inter.className,
            "bg-background font-sans antialiased relative"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar></NavBar>
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
