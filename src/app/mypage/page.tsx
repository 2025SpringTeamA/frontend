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
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col space-y-1 w-full max-w-sm">
          <label htmlFor="username" className="font-semibold">
            ユーザ名
          </label>
          <Input
            type="text"
            placeholder="ユーザ名"
            name="text"
            className="bg-white border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-col space-y-1 w-full max-w-sm">
          <label htmlFor="password" className="font-semibold">
            パスワード
          </label>
          <Input
            type="password"
            placeholder="パスワード"
            name="password"
            className="bg-white border px-3 py-2 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/mypage-edit"
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 text-center"
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
      </div>
    </>
  );
}
