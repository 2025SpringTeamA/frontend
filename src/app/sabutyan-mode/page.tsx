"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SabutyanMode() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    document.body.classList.add("washitsu");

    const storedToken = localStorage.getItem("token");
    const storedSessionId = localStorage.getItem("session_id");

    if (storedToken) setToken(storedToken);
    if (storedSessionId) setSessionId(storedSessionId);

    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const handleEnergy = async () => {
    try {
      const res = await fetch("/api/energy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "元気をもらう" }),
      });

      if (!res.ok) throw new Error("送信に失敗しました");

      const result = await res.json();
      alert(result.message || "元気をもらいました！");
    } catch {
      alert("エラーが発生しました");
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !sessionId) {
      alert("ログイン情報が不足しています");
      return;
    }

    try {
      const res = await fetch(`/api/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      if (!res.ok) throw new Error("メッセージ送信に失敗しました");

      const result = await res.json();
      alert("メッセージを送信しました！");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("メッセージ送信中にエラーが発生しました");
    }
  };

  return (
    <>
      <Logo />
      <NavBar />

      <main className="flex flex-col items-center justify-start min-h-screen gap-4 px-4 mt-2">
        {/* 画像のみ表示（テキストなし） */}
        <div className="flex justify-center">
          <Image
            src="/images/sabu1.png"
            alt="さぶちゃん"
            width={300}
            height={200}
            priority
          />
        </div>

        {/* メッセージ送信フォーム */}
        <form
          onSubmit={handleMessageSubmit}
          className="fusuma-form text-lg md:text-xl"
        >
          <label htmlFor="message">メッセージ</label>
          <textarea
            id="message"
            className="h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力してください"
          ></textarea>

          <button type="submit" className="form-submit-button mt-4 text-lg">
            メッセージを送る
          </button>
        </form>

        {/* 元気をもらうボタン */}
        <div className="w-full max-w-md flex justify-end mt-2">
          <button
            className="tatami-button text-lg px-6 py-3"
            onClick={handleEnergy}
          >
            元気をもらう
          </button>
        </div>
      </main>
    </>
  );
}
