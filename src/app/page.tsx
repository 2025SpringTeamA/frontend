"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`) 
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching message from FastAPI."));
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-8 gap-10 overflow-hidden">
      {/* アニメーション：右上 → 左下 → ロゴ位置 → 膨らんで弾ける */}
      <motion.img
        src="/images/sabuchan.png"
        alt="弾けるさぶちゃん"
        className="w-[200px] h-auto absolute z-0"
        initial={{ x: 400, y: -400, scale: 1, opacity: 1 }}
        animate={{
          x: [400, -400, 0, 0],
          y: [-400, 400, -100, -100], // -100 はロゴの縦位置目安
          scale: [1, 1, 1, 2, 0],
          opacity: [1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 0.85, 1],
        }}
      />

      {/* 通常の静止ロゴ */}
      <img
        src="/images/sabuchan_logo.png"
        alt="さぶちゃん日記"
        className="w-[300px] h-auto rounded z-10"
      />

      <p className="text-blue-400 font-semibold z-10">{message}</p>

      <div className="flex flex-row gap-20 z-10">
        <div className="flex flex-col gap-4">
          <Link
            href="/register"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] text-center"
          >
            一般ユーザー登録
          </Link>
          <Link
            href="/admin-register"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] text-center"
          >
            管理者登録
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/login"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] text-center"
          >
            ログイン
          </Link>
        </div>
      </div>
    </main>
  );
}