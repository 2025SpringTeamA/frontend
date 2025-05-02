"use client";

import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Logo />
      <NavBar />
      <div className="flex items-end gap-4 justify-center">
        <Link href="/sabutyan-mode">
          <Image
            src="/sabutyan.svg"
            alt="さぶちゃん"
            width={200}
            height={100}
          ></Image>
          <p className="text-white mt-2 text-center">三郎おじいちゃん</p>
        </Link>
        <Link href="/beautiful-woman-mode">
          <Image
            src="/beautiful_woman.svg"
            alt="美女"
            width={200}
            height={100}
          ></Image>
          <p className="text-white mt-2 text-center">美女</p>
        </Link>
      </div>
    </>
  );
}
