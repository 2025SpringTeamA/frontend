"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function SabutyanMode() {
  const [diaryMessage, setDiaryMessage] = useState("");
  const [cheerMessage, setCheerMessage] = useState("");
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // ★ テスト用に session_id を強制的にセット
    localStorage.setItem("session_id", "1");

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
    if (!sessionId) {
      toast.error("セッションIDが見つかりません");
      return;
    }

    try {
      const payload = {
        session_id: Number(sessionId),
        is_user: true,
        content: diaryMessage,
      };

      const res = await fetch(`http://localhost:8000/api/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("送信に失敗しました");

      const result = await res.json();

      // ✅ 応答を cheerMessage にセット
      setCheerMessage(result.content || "さぶちゃんから応援が届きました！");
    } catch (error) {
      console.error("エラー:", error);
      toast.error("エラーが発生しました");
    }
  };

  return (
    <>
      <Header/>

      <main className="washitsu min-h-screen px-4 py-6 space-y-6 flex flex-col items-center">
        <Image src="/images/sabu1.png" alt="さぶちゃん" width={300} height={200} />

        {/* 今日の日記 */}
        <div className="bg-[#fff9eb] border-[4px] border-[#8d6e63] rounded-xl shadow-md p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">今日の日記</h2>
          <textarea
            className="w-full h-32 border border-gray-300 rounded-md p-3 bg-[#fffaf0]"
            value={diaryMessage}
            onChange={(e) => setDiaryMessage(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-200 border-2 border-green-600 shadow-md px-6 py-2 rounded-md font-bold"
              onClick={handleEnergy}
            >
              元気をもらう
            </button>
          </div>
        </div>

        {/* さぶちゃんのエール（表示専用） */}
        <div className="bg-[#fff9eb] border-[4px] border-[#8d6e63] rounded-xl shadow-md p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">さぶちゃんからの熱いエール</h2>
          <div className="w-full h-32 border border-gray-300 rounded-md p-3 bg-[#fffaf0] whitespace-pre-wrap overflow-y-auto">
            {cheerMessage || "ここにさぶちゃんの応援が表示されます"}
          </div>
        </div>
      </main>
    </>
  );
}
