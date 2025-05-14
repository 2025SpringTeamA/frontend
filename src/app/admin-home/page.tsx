"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import "../../styles/common.css";

// 管理者情報の型
type AdminInfo = {
  user_name: string;
  email: string;
};

// ユーザー情報の型（必要に応じて追加可能）
type User = {
  is_active: boolean;
};

// メッセージ情報の型（必要に応じて追加可能）
type Message = {
  id: number;
  content: string;
  // 他のプロパティがあるなら追加
};

export default function AdminDashboard() {
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [userCount, setUserCount] = useState<number>(0);
  const [inactiveCount, setInactiveCount] = useState<number>(0);
  const [messageCount, setMessageCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("washitsu");
    fetchDashboardData();

    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchDashboardData = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [adminRes, usersRes, messagesRes] = await Promise.all([
        fetch("http://localhost:8000/api/admin_info", { headers }),
        fetch("http://localhost:8000/api/users", { headers }),
        fetch("http://localhost:8000/api/messages", { headers }),
      ]);

      if (adminRes.ok && usersRes.ok && messagesRes.ok) {
        const admin: AdminInfo = await adminRes.json();
        const users: User[] = await usersRes.json();
        const messages: Message[] = await messagesRes.json();
        console.log(admin);
        console.log(users);
        console.log("messages", messages);

        setAdminEmail(admin.email);
        setAdminName(admin.user_name);
        setUserCount(users.length);
        setInactiveCount(users.filter((u) => !u.is_active).length);
        setMessageCount(messages.length);
      } else {
        toast.error("情報の取得に失敗しました。再ログインしてください。");
      }
    } catch (error: unknown) {
      toast.error("通信エラーが発生しました");
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
          <Link href="/admin-home/admin-users" className="top-button text-center">
            ユーザー管理
          </Link>
          <Link href="/admin-home/admin-posts" className="top-button text-center">
            投稿内容の一覧
          </Link>
          <Link href="/admin-home/admin-settings" className="top-button text-center">
            設定変更
          </Link>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <section className="ml-64 flex-grow bg-white p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">ダッシュボード</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ログアウト
          </Link>
        </div>

        <p className="mb-6">こんにちは、{adminName} さん！</p>

        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="font-bold mb-2">概要</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>登録ユーザー数：{userCount}人</li>
            <li>無効化ユーザー数：{inactiveCount}人</li>
            <li>登録済メッセージ数：{messageCount}件</li>
          </ul>
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
