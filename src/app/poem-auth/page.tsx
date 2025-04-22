"use client";

import Link from "next/link";

export default function PoemAuth() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 gap-10">
      <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
        ポエム認証
      </h1>

      {/* ポエム選択プルダウン */}
      <div className="flex flex-col items-center">
        <label className="mb-2">ポエム選択画面</label>
        <select className="bg-gray-200 text-black px-6 py-2 rounded w-64">
          <option value="">ポエムを選んでください</option>
          <option value="poem1">1. 君の瞳に映る空</option>
          <option value="poem2">2. 静寂の午後</option>
          <option value="poem3">3. 春風と君の声</option>
          <option value="poem4">4. 雨上がりの約束</option>
          <option value="poem5">5. 星降る夜に</option>
        </select>
      </div>

      {/* ボタンエリア */}
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
          送信
        </button>
      </div>
    </main>
  );
}
