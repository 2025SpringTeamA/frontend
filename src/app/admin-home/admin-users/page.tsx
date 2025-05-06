"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../../../styles/common.css";

interface User {
  id: number;
  user_name: string;
  email: string;
  is_active: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    document.body.classList.add("washitsu");
    fetchUsers();
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("ユーザー取得に失敗");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      alert("ユーザー一覧の取得に失敗しました。");
    }
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setEditName(user.user_name);
    setEditEmail(user.email);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8000/api/users/${editUser?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_name: editName, email: editEmail }),
      });
      setEditUser(null);
      fetchUsers();
    } catch {
      alert("ユーザーの更新に失敗しました。");
    }
  };

  const handleDeactivate = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/api/users/${id}/deactivate`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const handleActivate = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/api/users/${id}/activate`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  return (
    <main className="relative flex h-screen w-full">
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
              {users.map(user => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.user_name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className={`p-2 border ${user.is_active ? "text-green-600" : "text-red-500"}`}>
                    {user.is_active ? "アクティブ" : "無効"}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button onClick={() => openEditModal(user)} className="text-blue-600 hover:underline">編集</button>
                    {user.is_active ? (
                      <button onClick={() => handleDeactivate(user.id)} className="text-yellow-600 hover:underline">凍結</button>
                    ) : (
                      <button onClick={() => handleActivate(user.id)} className="text-green-600 hover:underline">復活</button>
                    )}
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md space-y-4 w-[300px]">
              <h2 className="text-lg font-bold">ユーザー情報の編集</h2>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="ユーザー名"
              />
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="メールアドレス"
              />
              <div className="flex justify-end gap-2">
                <button className="button-back" onClick={() => setEditUser(null)}>キャンセル</button>
                <button className="button-submit" onClick={handleUpdate}>更新</button>
              </div>
            </div>
          </div>
        )}

        <img
          src="/images/sabuchan_logo.png"
          alt="さぶちゃん日記"
          className="w-[400px] h-auto absolute bottom-4 right-4 rounded z-0 opacity-30"
        />
      </section>
    </main>
  );
}
