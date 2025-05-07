"use client";

import Link from "next/link";
import { Button, Input } from "@headlessui/react";
import Logo from "@/components/Logo";

export default function MypageEdit() {
  return (
    <>
      <Logo />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-10">
        <h1 className="kakejiku">マイページ編集</h1>

        <form className="fusuma-form">
          <label className="text-black px-4 py-2 rounded">
            ユーザー名：
            <Input
              type="text"
              className="w-full mt-1 p-1 rounded"
              style={{ background: "white", color: "black" }}
            />
          </label>

          <label className="text-black px-4 py-2 rounded">
            パスワード：
            <Input
              type="password"
              className="w-full mt-1 p-1 rounded"
              style={{ background: "white", color: "black" }}
            />
          </label>
        </form>

        <div className="flex space-x-4">
          <Link href="/mypage" className="button-back">
            戻る
          </Link>
          <Button className="bg-green-100 text-black px-4 py-2 rounded hover:bg-green-200 w-[140px]">
            更新
          </Button>
        </div>
      </main>
    </>
  );
}
