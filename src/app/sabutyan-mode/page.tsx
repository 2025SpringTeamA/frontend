"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SabutyanMode() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("washitsu");
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
        <form className="fusuma-form text-lg md:text-xl">
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
          <button className="tatami-button text-lg px-6 py-3" onClick={handleEnergy}>
            元気をもらう
          </button>
        </div>
      </main>
    </>
  );
}
