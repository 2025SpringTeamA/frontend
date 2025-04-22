"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/") // FastAPI の URL に合わせて変更
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching message from FastAPI."));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 gap-10">
      <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
        サブちゃん日記
      </h1>

      <p className="text-blue-400 font-semibold">{message}</p>

      <div className="flex flex-row gap-20">
        <div className="flex flex-col gap-4">
          <Link
            href="/register"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 text-center"
          >
            一般ユーザー登録
          </Link>
          <Link
            href="/admin-register"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 text-center"
          >
            管理者登録
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/login"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 text-center"
          >
            ログイン
          </Link>
        </div>
      </div>
    </main>
  );
}
