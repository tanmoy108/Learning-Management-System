import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import ToastProvider from "@/components/ToastProvider/toastProvider";
import "@uploadthing/react/styles.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduMentor",
  description: "Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`bg-[#F2F2F2] ${inter.className} ${process.env.NODE_ENV === 'development' ? 'debug-screens' : "" }`}>
      <ToastProvider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
