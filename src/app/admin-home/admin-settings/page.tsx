"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../../../styles/common.css";

export default function AdminSettingsPage() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.body.classList.add("washitsu");
    fetchCurrentMessage();
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchCurrentMessage = async () => {
    try {
      const res = await fetch("http://localhost:8000/settings");
      const data = await res.json();
      setMessage(data.support_message);
      setNewMessage(data.support_message);
    } catch (err) {
      console.error("現在の設定取得に失敗しました", err);
    }
  };

  const updateMessage = async () => {
    try {
      const res = await fetch("http://localhost:8000/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_message: newMessage }),
      });
      if (res.ok) {
        setStatus("✅ 更新が完了しました。");
        fetchCurrentMessage();
      } else {
        const error = await res.json();
        setStatus(`❌ エラー: ${error.detail || "更新に失敗しました。"}`);
      }
    } catch (err) {
      console.error("更新エラー", err);
      setStatus("❌ 通信エラーが発生しました。");
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
          <Link href="/admin-home/admin-settings" className="top-button text-center">設定変更</Link>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <section className="ml-64 flex-grow bg-white p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">設定変更</h1>
          <Link href="/" className="text-blue-600 hover:underline">ログアウト</Link>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow-md mb-6 space-y-4">
          <h2 className="font-bold mb-2">現在のサポートメッセージ</h2>
          <p className="bg-white p-2 border rounded">{message || "（未設定）"}</p>

          <h3 className="font-bold mt-6">新しいメッセージ</h3>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="新しいサポートメッセージを入力してください"
          />

          <button onClick={updateMessage} className="button-submit">
            更新する
          </button>

          {status && <p className="text-sm mt-2">{status}</p>}
        </div>

        <img
          src="/images/sabuchan_logo.png"
          alt="さぶちゃん日記"
          className="w-[400px] h-auto absolute bottom-4 right-4 rounded z-0 opacity-30"
        />
      </section>
    </main>
  );
}
