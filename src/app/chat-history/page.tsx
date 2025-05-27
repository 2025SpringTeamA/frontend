"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type SessionSummary = {
  session_id: number;
  first_message: string;
  created_at: string;
  character_mode: string;
  is_favorite: boolean;
};

type SessionDetail = {
  chat_id: number;
  created_at: string;
  updated_at: string;
  messages: {
    message_id: number;
    message_text: string;
    sender_type: "user" | "ai";
  }[];
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
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(null);

  useEffect(() => {
    document.body.classList.add("washitsu");
    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);

  const fetchSessions = async (keyword = "", favorite = false) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append("keyword", keyword);
      if (favorite) queryParams.append("favorite_only", "true");

      const res = await fetch(`https://api.saburo.xyz/api/sessions?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      } else {
        console.error("チャット履歴取得失敗");
      }
    } catch (error) {
      console.error("通信エラー:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleToggleFavorite = async (sessionId: number, index: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://api.saburo.xyz/api/sessions/${sessionId}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const updatedSessions = [...sessions];
        updatedSessions[index].is_favorite = data.is_favorite;
        setSessions(updatedSessions);
        toast.success(data.is_favorite ? "お気に入りに追加しました" : "お気に入りを解除しました");
      } else {
        console.error("お気に入り更新に失敗しました");
      }
    } catch (error) {
      console.log("通信エラー:", error);
      toast.error("通信エラーが発生しました");
    }
  };

  const handleDelete = async (sessionId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://api.saburo.xyz/api/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSessions(sessions.filter((s) => s.session_id !== sessionId));
        toast.success("日記を削除しました");
      } else {
        toast.error("削除に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      toast.error("通信エラーが発生しました");
    }
  };

  const showDetail = async (sessionId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://api.saburo.xyz/api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSelectedSession(data);
      } else {
        toast.error("詳細情報の取得に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー:", error);
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
        <div className="w-full overflow-y-auto pr-4">
          <table className="table-auto border-collapse w-full">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">🗓 日付</th>
                <th className="border px-4 py-2">📄 日記の冒頭</th>
                <th className="border px-4 py-2">🧑‍🎤 選択キャラ</th>
                <th className="border px-4 py-2">🔍 詳細</th>
                <th className="border px-4 py-2">⭐ お気に入り</th>
                <th className="border px-4 py-2">🗑️ 削除</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, i) => (
                <tr key={i}>
                  <td className="bg-slate-100 border px-4 py-2">{new Date(session.created_at).toLocaleDateString()}</td>
                  <td className="bg-slate-100 border px-4 py-2">{session.first_message}</td>
                  <td className="bg-slate-100 border px-4 py-2">{getCharacterName(session.character_mode)}</td>
                  <td className="bg-slate-100 border px-4 py-2 text-center">
                    <button onClick={() => showDetail(session.session_id)} className="hover:underline text-blue-600">
                      表示
                    </button>
                  </td>
                  <td className="bg-slate-100 border px-4 py-2 text-center">
                    <button
                      onClick={() => handleToggleFavorite(session.session_id, i)}
                      className="text-2xl transition-transform duration-300 hover:scale-125 text-green-700"
                    >
                      {session.is_favorite ? "★" : "☆"}
                    </button>
                  </td>
                  <td className="bg-slate-100 border px-4 py-2 text-center">
                    <button onClick={() => handleDelete(session.session_id)} className="hover:scale-110 hover:text-red-600 transition">
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* スライドインパネル */}
        <div
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 border-l ${
            selectedSession ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">詳細</h2>
            <button onClick={() => setSelectedSession(null)} className="text-gray-500 text-xl">
              ✖️
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
            {selectedSession && (
              <>
                <p>
                  <strong>作成日:</strong> {new Date(selectedSession.created_at).toLocaleString()}
                </p>
                <div className="mt-4 space-y-2">
                  {selectedSession.messages.map((msg) => (
                    <div key={msg.message_id} className="border p-2 rounded bg-gray-50 break-words whitespace-pre-wrap">
                      <strong>{msg.sender_type === "user" ? "ユーザー" : "AI"}:</strong> {msg.message_text}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}