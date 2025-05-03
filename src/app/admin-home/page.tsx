"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../styles/common.css";

export default function AdminDashboard() {
  const [adminEmail, setAdminEmail] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("washitsu");
    fetchDashboardData();

    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // トークン未設定時のリダイレクト（コメントアウト中）
      // if (!token) {
      //   router.push("/login");
      //   return;
      // }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [adminRes, usersRes, messagesRes] = await Promise.all([
        fetch("http://localhost:8000/admin_info", { headers }),
        fetch("http://localhost:8000/users", { headers }),
        fetch("http://localhost:8000/messages", { headers }),
      ]);

      if (adminRes.ok && usersRes.ok && messagesRes.ok) {
        const admin = await adminRes.json();
        const users = await usersRes.json();
        const messages = await messagesRes.json();

        setAdminEmail(admin.email);
        setUserCount(users.length);
        setInactiveCount(users.filter((u: any) => !u.is_active).length);
        setMessageCount(messages.length);
      } else {
        alert("情報の取得に失敗しました。再ログインしてください。");

        // 認証エラー時のリダイレクト（コメントアウト中）
        // router.push("/login");
      }
    } catch (error) {
      alert("通信エラーが発生しました");

      // 通信エラー時のリダイレクト（コメントアウト中）
      // router.push("/login");
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
          <button className="top-button">設定変更</button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <section className="ml-64 flex-grow bg-white p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">ダッシュボード</h1>
          <Link href="/" className="text-blue-600 hover:underline">ログアウト</Link>
        </div>

        <p className="mb-6">こんにちは、{adminEmail} さん！</p>

        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="font-bold mb-2">概要</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>登録ユーザー数：{userCount}人</li>
            <li>無効化ユーザー数：{inactiveCount}人</li>
            <li>登録済メッセージ数：{messageCount}件</li>
          </ul>
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
