"use client";

import Header from '@/components/Header';
import Image from "next/image";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  const startSession = async (characterMode: "saburo" | "bijyo") => {
    try {
      const res = await fetch("http://localhost:8000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: 1,
          character_mode: characterMode,
        }),
      });

      if(res.ok){
        if (characterMode==="saburo"){
          router.push("/sabutyan-mode");
        }else {
          router.push("/beautiful-woman-mode");
        }
      }else {
        const data = await res.json();
        // トースト通知
        toast.info(data.detail || "日記");
      }
    } catch (err){
      console.log(err); // 開発用
      toast.console.error("通信エラーが発生しました");
    }
  };

  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  return (
    <>
      <Header/>
      <h1 className="text-center text-2xl m-9">今日の気分はどっちかな？</h1>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <button onClick={() => startSession("saburo")}>
          <Image
            src="/images/home-sabu.png"
            alt="さぶちゃん"
            width={300}
            height={100}
            className="transition-transform duration-300 ease-out hover:scale-110"
          ></Image>
        </button>
        <button onClick={()=>startSession("bijyo")}>
          <Image
            src="/images/home-bijyo.png"
            alt="美女"
            width={300}
            height={100}
            className="transition-transform duration-300 ease-out hover:scale-110"
          ></Image>
        </button>
      </div>
    </>
  );
}
