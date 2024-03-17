import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/NavBar";
import UploadForm from "@/components/UploadForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

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
            "min-h-screen bg-background font-sans antialiased"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar></NavBar>
            <UploadForm></UploadForm>
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
