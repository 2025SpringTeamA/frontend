"use client";

import Link from "next/link";
import { Button, Input } from "@headlessui/react";
import Logo from "@/components/Logo";

export default function MypageEdit() {
  return (
    <>
      <Logo />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 gap-10">
        <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
          マイページ編集
        </h1>

        <form className="flex flex-col gap-4 w-64">
          <label className="bg-gray-200 text-black px-4 py-2 rounded">
            ユーザー名：
            <Input
              type="text"
              className="w-full mt-1 p-1 rounded"
              style={{ background: "white", color: "black" }}
            />
          </label>

          <label className="bg-gray-200 text-black px-4 py-2 rounded">
            パスワード：
            <Input
              type="password"
              className="w-full mt-1 p-1 rounded"
              style={{ background: "white", color: "black" }}
            />
          </label>
        </form>

        <div className="flex space-x-4">
          <Link
            href="/mypage"
            className="flex items-center justify-center bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px]"
          >
            戻る
          </Link>
          <Button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px]">
            更新
          </Button>
        </div>
      </main>
    </>
  );
}
