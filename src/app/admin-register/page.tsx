"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import "../../styles/common.css";

// サーバーからの成功レスポンス型（必要に応じて拡張）
type RegisterResponse = {
  message: string;
  token?: string;
};

// サーバーからのエラーレスポンス型
type ErrorResponse = {
  detail?: string;
};

export default function AdminRegister() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const res = await fetch("http://api.saburo.xyz:8000/api/admin/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          user_name: userName,
          pin_code: pinCode,
        }),
      });

      if (res.ok) {
        const data: RegisterResponse = await res.json();
        console.log("登録成功:", data);

        // 🔑 トークン保存
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        router.push("/admin-home");
      } else {
        const error: ErrorResponse = await res.json();
        toast.error(error.detail || "登録に失敗しました")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("通信エラー:", err.message);
      } else {
        console.error("未知のエラー:", err);
      }
      toast.error("通信エラーが発生しました");
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-12 gap-10">
      <h1 className="kakejiku">管理ユーザー登録</h1>

      <form onSubmit={handleRegister} className="fusuma-form">
        <label htmlFor="username">お名前</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="pinCode">PINコード</label>
        <input
          id="pinCode"
          type="password"
          value={pinCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPinCode(e.target.value)}
          required
        />

        <div className="form-button-group">
          <Link href="/" className="button-back">
            戻る
          </Link>
          <button type="submit" className="button-submit">
            登録
          </button>
        </div>
      </form>
    </main>
  );
}
