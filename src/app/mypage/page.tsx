"use client";

import Logo from "@/components/Logo";
import { Button, Input } from "@headlessui/react";
import NavBar from "@/components/NavBar";

import { useEffect, useState } from "react";
import "@/styles/common.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add("washitsu");

    // ユーザー情報を取得する処理
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:8000/api/user/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUsername(userData.username || "");
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("ログインが必要です");
      return;
    }
    if (!username || !password) {
      alert("ユーザ名とパスワードを入力してください");
      return;
    }
    fetch("http://localhost:8000/api/user/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, password }),
    });
  };
  const handleDeleteClick = () => {
    const confirmed = window.confirm("本当に削除してもよろしいですか？");
    if (confirmed) {
      // ユーザーアカウントを削除するAPIリクエスト
      const token = localStorage.getItem("token");
      if (!token) {
        alert("ログインが必要です");
        return;
      }

      fetch("http://localhost:8000/api/user/delete", {
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
          alert(data.message || "アカウントを完全に削除しました");
          // トークンを削除してログアウト状態にする
          localStorage.removeItem("token");
          // ホームページに遷移
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("エラー:", error);
          alert("アカウントの削除に失敗しました");
        });
    }
  };
  return (
    <>
      <Logo />
      <NavBar />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
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
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            onClick={handleChangeClick}
          >
            変更
          </Button>

          <Button
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            onClick={handleDeleteClick}
          >
            削除
          </Button>
        </div>
      </main>
    </>
  );
}
