import type { Metadata } from "next";
import { Geist, Geist_Mono, M_PLUS_Rounded_1c } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import "../styles/common.css"; // ← 追加：和室用CSS（必要に応じて）


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mPlus = M_PLUS_Rounded_1c({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-mplus",
});

export const metadata: Metadata = {
  title: "さぶちゃん日記",
  description: "日記アプリ",
  icons: {
    icon: "/images/sabuchan.png", // public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <head>
      </head>
      <body className={`washitsu ${geistSans.variable} ${geistMono.variable} ${mPlus.variable} antialiased`}>
        {/* ✅ トースト表示コンポーネント */}
        <Toaster richColors position="top-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}
