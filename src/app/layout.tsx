import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "さぶちゃん日記",
  description: "日記アプリ",
  icons: {
    icon: "/favicon.png", // public/favicon.png
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
        {/* さぶちゃん日記風フォント（M PLUS Rounded 1c）を読み込み */}
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`washitsu ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ トースト表示コンポーネント */}
        <Toaster richColors position="top-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}
