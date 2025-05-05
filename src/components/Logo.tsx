"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <>
      <header className="w-full p-4">
        <div className="flex items-start justify-start m-0 p-0">
          <Link href="/home">
            <Image
              src="/images/sabuchan_logo.png"
              alt="ロゴ"
              width={100}
              height={100}
            ></Image>
          </Link>
        </div>
      </header>
    </>
  );
}
