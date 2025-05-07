"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/common.css"; // 共通CSSを読み込み

const Register: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          user_name: userName, // FastAPIと合わせる
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("登録成功:", data);

        // 🔑 トークン保存
        localStorage.setItem("token", data.token);

        router.push("/home");
      } else {
        const error = await res.json();
        alert(error.detail || "登録に失敗しました");
      }
    } catch {
      alert("通信エラーが発生しました");
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-12 gap-10">
      <h1 className="kakejiku">一般ユーザー登録</h1>

      <form onSubmit={handleRegister} className="fusuma-form">
        <label htmlFor="username">お名前</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
};

export default Register;
