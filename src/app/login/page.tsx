"use client";

import Link from "next/link";

export default function Login() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 pt-16 gap-10">
      {/* 戻るボタン（左上） */}
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 text-center"
        >
          戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
        ログイン
      </h1>

      <form className="flex flex-col gap-6 w-[320px]">
        <label className="bg-gray-200 text-black px-4 py-3 rounded">
          ユーザー名：
          <input
            type="text"
            className="w-full mt-2 p-2 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-gray-200 text-black px-4 py-3 rounded">
          パスワード：
          <input
            type="password"
            className="w-full mt-2 p-2 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        {/* ログイン種別ボタン */}
        <div className="flex justify-between">
          <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px]">
            管理ユーザー
          </button>

          <Link
            href="/poem-auth"
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px] text-center"
          >
            一般ユーザー
          </Link>
        </div>
      </form>
    </main>
  );
}
