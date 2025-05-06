"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function ChatHistory() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 検索処理をここに書く
    console.log("検索クエリ:", query);
  };
  useEffect(() => {
    document.body.classList.add("washitsu");

    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);
  return (
    <>
      <Logo />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">チャット履歴</h2>
        </div>
      </div>
      <NavBar />
      <SearchBar />
    </>
  );
}
