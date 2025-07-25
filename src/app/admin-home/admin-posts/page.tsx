"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import "../../../styles/common.css";

interface Message {
  id: number;
  user: { user_name: string } | null;
  content: string;
  created_at: string;
}

export default function PostListPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    document.body.classList.add("washitsu");
    fetchMessages();
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://api.saburo.xyz/api/messages",{
        headers :{
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error("認証エラー or APIエラー");
      }
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("投稿の取得に失敗しました", error);
    }
  };

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
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{msg.user?.user_name || "匿名"}</td>
                    <td className="p-2 border">{msg.content}</td>
                    <td className="p-2 border">{new Date(msg.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr key="no-messages">
                  <td colSpan={3} className="p-2 border text-center text-gray-500">
                    投稿がまだありません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* アニメーションロゴ */}
        <Image
          src="/images/sabuchan_logo.png"
          alt="さぶちゃん日記"
          width={400}
          height={300}
          className="absolute bottom-4 right-4 rounded z-0 opacity-30"
        />
      </section>
    </main>
  );
}
