"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Link href="/home">
        <Image src="/logo.svg" alt="ロゴ" width={100} height={100}></Image>
      </Link>
    </>
  );
}
