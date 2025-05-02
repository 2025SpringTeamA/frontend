"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "../styles/common.css";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    document.body.classList.add("washitsu"); // ← 背景などを適用
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching message from FastAPI."));
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-10 overflow-hidden">
      {/* アニメーション：右上 → 左下で回転＆弾ける */}
      <motion.img
        src="/images/sabuchan.png"
        alt="弾けるさぶちゃん"
        className="w-[200px] h-auto absolute z-0"
        initial={{ x: 400, y: -400, rotate: 0, scale: 1, opacity: 1 }}
        animate={{
          x: [400, 200, 0, -200, -400],
          y: [-400, -200, 0, 200, 400],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1, 1, 1.3, 0],
          opacity: [1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />

      {/* 通常の静止ロゴ */}
      <img
        src="/images/sabuchan_logo.png"
        alt="さぶちゃん日記"
        className="w-[700px] h-auto rounded z-10"
      />

      <p className="text-blue-400 font-semibold z-10">{message}</p>

      <div className="flex flex-row gap-20 z-10">
        <div className="flex flex-col gap-4">
          <Link href="/register" className="top-button text-center">
            一般ユーザー登録
          </Link>
          <Link href="/admin-register" className="top-button text-center">
            管理者登録
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/login" className="top-button text-center">
            ログイン
          </Link>
        </div>
      </div>
    </main>
  );
}
