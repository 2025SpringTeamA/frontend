"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SessionSummary = {
  id: number;
  first_message: string;
  created_at: string;
  character_mode: string;
  is_favorite: boolean;
};

const characterLabels: { [key: string]: string } = {
  saburo: "さぶちゃん",
  bijyo: "美女",
};
const getCharacterName = (mode: string) => characterLabels[mode] ?? mode;


export default function ChatHistory() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [keyword, setKeyword] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchSessions = async(keyword = "", favorite =false) => {
      try {
        const token = localStorage.getItem("token");
        const queryParams = new URLSearchParams();
        if (keyword) queryParams.append("keyword", keyword);
        if (favorite) queryParams.append("favorite_only", "true");
        
        const res = await fetch(`http://localhost:8000/api/sessions?${queryParams.toString()}`, {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });

        if(res.ok) {
          const data = await res.json();
          setSessions(data);
          console.log(data);
        }else {
          console.error("チャット履歴取得失敗");
        }
      }catch (error){
        console.error("通信エラー:", error);
      }
    };

  useEffect(()=>{
    fetchSessions();
  }, []);

  // お気に入りトグル
  const handleToggleFavorite = async (sessionId: number, index: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/sessions/${sessionId}/favorite`, {
        method :"POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.ok){
        const data = await res.json();
        const updatedSessions = [...sessions];
        updatedSessions[index].is_favorite = data.is_favorite;
        setSessions(updatedSessions);

        // トースト通知
        toast.success(data.is_favorite ? "お気に入りに追加しました" : "お気に入りを解除しました");
      }else {
        console.error("お気に入り更新に失敗しました");
      }
    }catch(error) {
      console.log("通信エラー:", error);
      toast.error("通信エラーが発生しました");
    }
  };



  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto mt-4 space-y-2 md:space-y-0 md:space-x-4">
        <SearchBar 
          onSearch={(kw) => {
            setKeyword(kw);
            fetchSessions(kw, favoriteOnly);
          }}
        />
        <label className="flex items-center space-x-2">
          <input
              type="checkbox"
              checked={favoriteOnly}
              onChange={(e) => {
              const checked = e.target.checked;
              setFavoriteOnly(checked);
              fetchSessions(keyword, checked);
              }}
              className="form-checkbox h-5 w-5 text-green-600"
          />
          <span className="w-[150px]">お気に入りのみ</span>
        </label>
      </div>

      <div className="whitespace-nowrap overflow-auto h-[500px] w-[90%] mt-[100px] mx-auto">
        <table className="table-auto border-collapse w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">日付</th>
              <th className="border px-4 py-2">内容</th>
              <th className="border px-4 py-2">キャラ</th>
              <th className="border px-4 py-2">お気に入り</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, i) => (
              <tr key={i}>
                <td className="bg-slate-100 border px-4 py-2">{new Date(session.created_at).toLocaleDateString()}</td>
                <td className="bg-slate-100 border px-4 py-2">{session.first_message}</td>
                <td className="bg-slate-100 border px-4 py-2">{getCharacterName(session.character_mode)}</td>
                <td className="bg-slate-100 border px-4 py-2 text-center">
                  <button onClick={() => handleToggleFavorite(session.session_id, i)}
                    className="text-2xl transition-transform duration-300 hover:scale-125">
                    {session.is_favorite ? "★" : "☆"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}
