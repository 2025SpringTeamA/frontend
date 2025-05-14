"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import "../../styles/common.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("一般ユーザーログイン成功:", data);

        // 🔑 トークン保存
        localStorage.setItem("token", data.token);

        router.push("/home");
      } else {
        const error = await res.json();
        toast.error(error.detail || "ログインに失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  const handleAdminClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPinDialog(true);
  };

  const handleAdminLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, pin_code: pinCode }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("管理者ログイン成功:", data);

        // 🔑 トークン保存
        localStorage.setItem("token", data.token);

        router.push("/admin-home");
      } else {
        const error = await res.json();
        toast.error(error.detail || "管理者ログインに失敗しました");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-12 gap-10">
      <h1 className="kakejiku">ログイン</h1>

      <form onSubmit={handleUserLogin} className="fusuma-form">
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
          <button type="button" onClick={handleAdminClick} className="button-submit">
            管理ユーザー
          </button>
          <button type="submit" className="button-submit">
            一般ユーザー
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/" className="button-back">
            戻る
          </Link>
        </div>
      </form>

      {showPinDialog && (
        <div className="fixed inset-0 flex items-center justify-center modal-bg z-50">
          <div className="bg-white border border-black rounded p-6 flex flex-col items-center gap-4">
            <h2 className="text-lg font-bold text-black">PINコードを入力してください</h2>
            <input
              type="password"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="border border-gray-400 rounded p-2 w-48 text-center"
            />
            <div className="form-button-group">
              <button
                onClick={() => setShowPinDialog(false)}
                className="button-back"
              >
                キャンセル
              </button>
              <button
                onClick={handleAdminLogin}
                className="button-submit"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
