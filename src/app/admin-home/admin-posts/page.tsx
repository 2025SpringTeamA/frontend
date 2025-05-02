"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../../../styles/common.css";

export default function PostListPage() {
  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  return (
    <main className="relative flex h-screen w-full">
      {/* サイドバー */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 space-y-6 z-10 flex flex-col justify-between">
        <div>
          <div className="text-xl font-bold mb-6">さぶちゃん管理システム</div>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/admin-home/admin-users" className="top-button text-center">ユーザー管理</Link>
          <Link href="/admin-home/admin-posts" className="top-button text-center">投稿内容の一覧</Link>
          <Link href="/admin-home/admin-settings" className="top-button text-center">設定変更</Link>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <section className="ml-64 flex-grow bg-white p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">投稿内容の一覧</h1>
          <Link href="/" className="text-blue-600 hover:underline">ログアウト</Link>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="font-bold mb-4">投稿一覧</h2>
          <table className="w-full table-auto text-left border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">投稿者</th>
                <th className="p-2 border">内容</th>
                <th className="p-2 border">投稿日</th>
              </tr>
            </thead>
            <tbody>
              {/* 仮データ */}
              <tr>
                <td className="p-2 border">田中 太郎</td>
                <td className="p-2 border">こんにちは、これはテスト投稿です！</td>
                <td className="p-2 border">2025/05/01</td>
              </tr>
              <tr>
                <td className="p-2 border">鈴木 花子</td>
                <td className="p-2 border">本日は晴天なり☀️</td>
                <td className="p-2 border">2025/05/02</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* アニメーションロゴ */}
        <img
          src="/images/sabuchan_logo.png"
          alt="さぶちゃん日記"
          className="w-[400px] h-auto absolute bottom-4 right-4 rounded z-0 opacity-30"
        />
      </section>
    </main>
  );
}
