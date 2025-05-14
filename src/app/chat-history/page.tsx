"use client";

import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useEffect } from "react";

export default function ChatHistory() {
  useEffect(() => {
    document.body.classList.add("washitsu");

    return () => {
      document.body.classList.remove("washitsu");
    };
  }, []);
  return (
    <>
      <Logo />
      <NavBar />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 rounded-lg">
          <h1 className="kakejiku">チャット履歴</h1>
        </div>
      </div>
      <SearchBar />
    </>
  );
}
