"use client";

import Link from "next/link";

export default function AdminRegister() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8 gap-10">
      <h1 className="text-3xl font-bold bg-[#226b22] text-[#f6e64c] px-10 py-4 rounded">
        管理ユーザー登録
      </h1>

      <form className="flex flex-col gap-4 w-80">
        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          ユーザー名：
          <input
            type="text"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          メールアドレス：
          <input
            type="email"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          パスワード：
          <input
            type="password"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          PINコード：
          <input
            type="text"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        {/* ボタンエリア（次へ / 戻る） */}
        <div className="flex justify-between w-full mt-4">
          <Link
            href="/"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] text-center"
          >
            戻る
          </Link>

          <Link
            href="/admin-home"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] text-center"
          >
            登録
          </Link>
        </div>
      </form>
    </main>
  );
}
