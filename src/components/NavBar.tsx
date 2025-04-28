"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link href="/home" className="text-white hover:text-gray-300">
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/chat-history"
                className="text-white hover:text-gray-300"
              >
                チャット履歴
              </Link>
            </li>
            <li>
              <Link href="/mypage" className="text-white hover:text-gray-300">
                マイページ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
