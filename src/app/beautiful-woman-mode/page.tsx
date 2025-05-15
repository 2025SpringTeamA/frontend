"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function BijyoMode() {
  const [diaryMessage, setDiaryMessage] = useState("");
  const [cheerMessage, setCheerMessage] = useState("");
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [showMom, setShowMom] = useState(false);

  useEffect(() => {
    // テスト用に session_id を強制的にセット
    localStorage.setItem("session_id", "1");

    document.body.classList.add("washitsu");

    const storedToken = localStorage.getItem("token");
    const storedSessionId = localStorage.getItem("session_id");

    if (storedToken) setToken(storedToken);
    if (storedSessionId) setSessionId(storedSessionId);

    // 5回に1回だけ怒ったお母さん画像と音声を表示
    const chance = Math.floor(Math.random() * 5);
    if (chance === 0) {
      setShowMom(true);

      // 音声を再生
      const audio = new Audio("/sounds/angry-voice.mp3");
      audio.play().catch((err) => {
        console.warn("音声の自動再生がブロックされました", err);
      });

      // 3秒後に非表示
      setTimeout(() => setShowMom(false), 3000);
    }

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
      setCheerMessage(result.content || "美女から応援が届きました！");
    } catch (error) {
      console.error("エラー:", error);
      toast.error("エラーが発生しました");
    }
  };

  return (
    <>
      {/* 怒ったお母さんの画像と音声（5回に1回、3秒表示） */}
      {showMom && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <Image
            src="/images/mom-ang-removebg.png"
            alt="怒ったお母さん"
            width={600}
            height={600}
            className="animate-pulse"
          />
        </div>
      )}

      <Header />
      <main className="washitsu min-h-screen px-4 py-6 space-y-6 flex flex-col items-center">
        <Image src="/images/home.png" alt="美女" width={300} height={200} />

        {/* 今日のつぶやき */}
        <div className="bg-[#fff0f5] border-[4px] border-[#d48fb1] rounded-xl shadow-md p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">今日のつぶやき</h2>
          <textarea
            className="w-full h-32 border border-gray-300 rounded-md p-3 bg-[#fff7fa]"
            value={diaryMessage}
            onChange={(e) => setDiaryMessage(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              className="bg-pink-200 border-2 border-pink-500 shadow-md px-6 py-2 rounded-md font-bold"
              onClick={handleEnergy}
            >
              応援してもらう
            </button>
          </div>
        </div>

        {/* 美女からのエール（表示専用） */}
        <div className="bg-[#fff0f5] border-[4px] border-[#d48fb1] rounded-xl shadow-md p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">美女からのやさしいエール</h2>
          <div className="w-full h-32 border border-gray-300 rounded-md p-3 bg-[#fff7fa] whitespace-pre-wrap overflow-y-auto">
            {cheerMessage || "ここに美女からの応援が表示されます"}
          </div>
        </div>
      </main>
    </>
  );
}
