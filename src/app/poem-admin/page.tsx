"use client";

import Link from "next/link";

export default function PoemAdmin() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 gap-10">
      <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
        ポエム管理者
      </h1>

      <div className="flex flex-col items-center">
        <label className="bg-gray-200 text-black px-6 py-2 rounded w-64 text-left">
          PINコード：
          <input
            type="password"
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>
      </div>

      {/* ボタンエリア（戻る / 新規登録） */}
      <div className="flex justify-between w-full max-w-xs">
        {/* 戻るボタン */}
        <Link
          href="/"
          className="bg-gray-200 text-black px-6 py-2 mt-4 rounded hover:bg-gray-300 text-center"
        >
          戻る
        </Link>

        {/* 新規登録ボタン */}
        <button className="bg-gray-200 text-black px-6 py-2 mt-4 rounded hover:bg-gray-300">
          新規登録
        </button>
      </div>
    </main>
  );
}
