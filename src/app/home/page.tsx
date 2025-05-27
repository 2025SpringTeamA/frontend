"use client";

import Header from '@/components/Header';
import Image from "next/image";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const startSession = async (characterMode: "saburo" | "bijyo") => {
    try {
      const res = await fetch("http://api.saburo.xyz:8000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          character_mode: characterMode,
        }),
      });

      if(res.ok){
        const data = await res.json();
        const id = data.id
        localStorage.setItem("session_id", id.toString());
        
        if (characterMode==="saburo"){
          router.push("/sabutyan-mode");
        }else {
          router.push("/beautiful-woman-mode");
        }
      }else {
        const data = await res.json();
        let message = "エラーが発生しました";
        if(Array.isArray(data.detail)){
          message = (data.detail as { msg: string }[]).map((d) => d.msg).join("/");
        }else if(typeof data.detail=== 'string'){
          message=data.detail
        }
        // トースト通知
        toast.info(message);
      }
    } catch (err){
      console.log(err); // 開発用
      toast.error("通信エラーが発生しました");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    
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
