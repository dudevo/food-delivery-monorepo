import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "./components/layout/Layout";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodDelivery - Delicious food delivered to your door",
  description: "Order from your favorite restaurants and get food delivered fast. Browse restaurants, view menus, and track your order in real-time.",
  keywords: "food delivery, restaurant, order online, takeout, fast delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mock user data - in a real app this would come from authentication
  const currentUser = undefined // Set to undefined for logged-out state
  // const currentUser = { name: "John Doe", avatar: "/avatar.jpg" }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout currentUser={currentUser}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
