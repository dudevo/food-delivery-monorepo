import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Courier App - Food Delivery Service",
  description: "Professional courier app for food delivery services. Manage orders, track earnings, and optimize your delivery routes.",
  keywords: "courier, food delivery, orders, earnings, delivery tracking",
  authors: [{ name: "Food Delivery Service" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
