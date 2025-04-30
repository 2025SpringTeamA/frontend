"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("登録成功:", data);
        router.push("/home");
      } else {
        const error = await res.json();
        console.error("登録失敗:", error);
        alert(error.detail || "登録に失敗しました");
      }
    } catch (err) {
      console.error("通信エラー:", err);
      alert("通信エラーが発生しました");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8 gap-10">
      <h1 className="text-3xl font-bold bg-[#226b22] text-[#f6e64c] px-10 py-4 rounded">
        一般ユーザー登録
      </h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          ユーザー名：
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          メールアドレス：
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded">
          パスワード：
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-1 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <div className="flex justify-between w-full mt-4">
          <Link
            href="/"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] text-center"
          >
            戻る
          </Link>

          <button
            type="submit"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a]"
          >
            登録
          </button>
        </div>
      </form>
    </main>
  );
}
