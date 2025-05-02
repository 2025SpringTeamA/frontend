"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../../../styles/common.css";

export default function UserManagement() {
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
          <button className="top-button">設定変更</button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <section className="ml-64 flex-grow bg-white p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">ユーザー管理</h1>
          <Link href="/" className="text-blue-600 hover:underline">ログアウト</Link>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="font-bold mb-4">ユーザー一覧</h2>
          <table className="w-full table-auto text-left border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ユーザー名</th>
                <th className="p-2 border">メールアドレス</th>
                <th className="p-2 border">状態</th>
                <th className="p-2 border">操作</th>
              </tr>
            </thead>
            <tbody>
              {/* 仮のデータを表示（後でAPI連携） */}
              <tr>
                <td className="p-2 border">田中 太郎</td>
                <td className="p-2 border">tanaka@example.com</td>
                <td className="p-2 border text-green-600">アクティブ</td>
                <td className="p-2 border space-x-2">
                  <button className="text-blue-600 hover:underline">編集</button>
                  <button className="text-yellow-600 hover:underline">凍結</button>
                  <button className="text-red-600 hover:underline">削除</button>
                </td>
              </tr>
              <tr>
                <td className="p-2 border">鈴木 花子</td>
                <td className="p-2 border">hanako@example.com</td>
                <td className="p-2 border text-red-500">無効</td>
                <td className="p-2 border space-x-2">
                  <button className="text-blue-600 hover:underline">編集</button>
                  <button className="text-green-600 hover:underline">復活</button>
                  <button className="text-red-600 hover:underline">削除</button>
                </td>
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
