"use client";

import Logo from "@/components/Logo";
import { Button, Input } from "@headlessui/react";
import NavBar from "@/components/NavBar";

import Link from "next/link";
import { useEffect } from "react";
import "@/styles/common.css";

export default function Home() {
  const handleDeleteClick = () => {
    const confirmed = window.confirm("本当に削除してもよろしいですか？");
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
      <NavBar />

      <div className="flex flex-col items-center">
        {/* <form> */}
        <label>ユーザ名</label>
        <input
          type="text"
          placeholder="ユーザ名"
          name="text"
          style={{ background: "white", color: "black" }}
        />
      </div>
      <div className="flex flex-col items-center">
        <label>パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          name="password"
          style={{ background: "white", color: "black" }}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/mypage-edit"
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px]"
        >
          変更
        </Link>

        <Button
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          onClick={handleDeleteClick}
        >
          削除
        </Button>
      </div>
    </>
  );
}
