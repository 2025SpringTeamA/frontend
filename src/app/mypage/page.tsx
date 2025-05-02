"use client";

import Logo from "@/components/Logo";
import { Button, Input } from "@headlessui/react";
import NavBar from "@/components/NavBar";

import Link from "next/link";

export default function Home() {
  const handleClick = () => {
    const confirmed = window.confirm("本当に削除してもよろしいですか？");
  };
  return (
    <>
      <Logo />
      <NavBar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 gap-10">
        <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
          マイページ編集
        </h1>
        <Button
          onClick={handleClick}
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px]"
        >
          削除
        </Button>
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
      </div>
      <div className="flex flex-col items-center">
        {/* <form> */}
        <label>ユーザ名</label>
        <input
          type="text"
          placeholder="ユーザ名"
          name="text"
          style={{ background: "white", color: "black" }}
          //   onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-center">
        <label>パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          name="password"
          style={{ background: "white", color: "black" }}
          //   onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-center">
        <Link
          // onClick={handleClick}
          href="/mypage-edit"
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 w-[140px]"
        >
          変更
        </Link>
      </div>
    </>
  );
}
