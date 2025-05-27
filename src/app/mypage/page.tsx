"use client";

import { toast } from "sonner";
import { Button, Input } from "@headlessui/react";
import Header from "@/components/Header";

import { useEffect, useState } from "react";
import "@/styles/common.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.add("washitsu");

    // ユーザー情報を取得する処理
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("https://api.saburo.xyz:8000/api/user/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUsername(userData.user_name || "");
            setEmail(userData.email || "");
          }
        } catch (error) {
          console.error("ユーザー情報の取得に失敗しました", error);
        }
      }
    };

    fetchUserData();

    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("ログインが必要です");
      return;
    }
    if (!username && !password && !email) {
      toast.info(
        "ユーザ名またはメールアドレスまたはパスワードを入力してください"
      );
      return;
    }
    fetch("https://api.saburo.xyz:8000/api/user/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_name: username, email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("更新に失敗しました");
      })
      .then((data) => {
        toast.success(data.message || "アカウントを更新しました");
      })
      .catch((error) => {
        console.error("エラー:", error);
        toast.error("アカウントの更新に失敗しました");
      });
  };

  const handleDeleteClick = () => {
    // ユーザーアカウントを削除するAPIリクエスト
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("ログインが必要です");
      return;
    }

    fetch("https://api.saburo.xyz:8000/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("削除に失敗しました");
      })
      .then((data) => {
        toast.success(data.message || "アカウントを完全に削除しました");
        // トークンを削除してログアウト状態にする
        localStorage.removeItem("token");
        // ホームページに遷移
        window.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
        toast.error("アカウントの削除に失敗しました");
      });
  };
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center p-8 gap-4">
        <h1 className="kakejiku">マイページ</h1>

        <form className="fusuma-form">
          <label htmlFor="username" className="font-semibold">
            ユーザ名
          </label>
          <Input
            type="text"
            placeholder="ユーザ名"
            name="text"
            className="bg-white border px-3 py-2 rounded"
            value={username}
            onChange={handleUsernameChange}
          />

          <label htmlFor="email" className="font-semibold">
            メールアドレス
          </label>
          <Input
            type="email"
            placeholder="sample@example.com"
            name="email"
            className="bg-white border px-3 py-2 rounded"
            value={email}
            onChange={handleEmailChange}
          />

          <label htmlFor="password" className="font-semibold">
            パスワード
          </label>
          <Input
            type="password"
            placeholder="パスワード"
            name="password"
            className="bg-white border px-3 py-2 rounded"
            value={password}
            onChange={handlePasswordChange}
          />
        </form>

        <div className="flex space-x-4">
          <Button
            className="button-back"
            onClick={handleChangeClick}
          >
            変更
          </Button>

          <Button
            className="bg-red-100 text-red-600 px-7 py-2 border-2 border-red-900 rounded-lg hover:bg-red-200 transition-colors duration-200"
            onClick={() => setDeleteTargetId(0)}
          >
            削除
          </Button>
        </div>
        {/* 削除確認モーダル */}
        {deleteTargetId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">削除の確認</h2>
              <p className="mb-6">
                本当にこのユーザーを削除してもよろしいですか？
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                  onClick={() => setDeleteTargetId(null)}
                >
                  キャンセル
                </Button>
                <Button
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  onClick={handleDeleteClick}
                >
                  削除する
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
