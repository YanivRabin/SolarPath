import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainWrapper from "@/components/MainWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolarPath",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-900">
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
