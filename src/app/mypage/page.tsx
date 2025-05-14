"use client";

import Header from "@/components/Header";
import { Button, Input } from "@headlessui/react";

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
      <Header/>
      <main className="flex flex-col items-center justify-center">
        <form className="fusuma-form">
          <label htmlFor="username" className="font-semibold">
            ユーザ名
          </label>
          <Input
            type="text"
            placeholder="ユーザ名"
            name="text"
            className="bg-white border px-3 py-2 rounded"
          />
          <label htmlFor="password" className="font-semibold">
            パスワード
          </label>
          <Input
            type="password"
            placeholder="パスワード"
            name="password"
            className="bg-white border px-3 py-2 rounded"
          />
        </form>

        <div className="flex space-x-4">
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
      </main>
    </>
  );
}
