"use client";

import Link from "next/link";

export default function Register() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 gap-10">
      <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
        会員登録
      </h1>

      <form className="flex flex-col gap-4 w-64">
        <label className="bg-gray-200 text-black px-4 py-2 rounded">
          ユーザー名：
          <input
            type="text"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-gray-200 text-black px-4 py-2 rounded">
          メールアドレス：
          <input
            type="email"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-gray-200 text-black px-4 py-2 rounded">
          パスワード：
          <input
            type="password"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        {/* ボタンエリア（次へ / 戻る） */}
        <div className="flex justify-between w-full mt-4">
          {/* 戻るボタン */}
          <Link
            href="/"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 text-center"
          >
            戻る
          </Link>

          {/* 次へボタン */}
          <Link
            href="/poem-auth"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 text-center"
          >
            次へ
          </Link>
        </div>
      </form>
    </main>
  );
}
