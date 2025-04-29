"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const router = useRouter();

  const handleAdminClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPinDialog(true);
  };

  const handleConfirmPin = () => {
    if (pinCode === "1234") {
      // PINが正しい場合、管理者ホームに遷移
      router.push("/admin-home");
    } else {
      alert("PINコードが間違っています！");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-8 pt-16 gap-10">
      <h1 className="text-3xl font-bold bg-gray-200 text-black px-10 py-4 rounded">
        ログイン
      </h1>

      <form className="flex flex-col gap-6 w-[320px]">
        <label className="bg-gray-200 text-black px-4 py-3 rounded">
          ユーザー名：
          <input
            type="text"
            className="w-full mt-2 p-2 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-gray-200 text-black px-4 py-3 rounded">
          パスワード：
          <input
            type="password"
            className="w-full mt-2 p-2 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        {/* ログイン種別ボタン */}
        <div className="flex justify-between">
          {/* 管理ユーザー用ボタン */}
          <button
            onClick={handleAdminClick}
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 w-[150px] text-center"
          >
            管理ユーザー
          </button>

          {/* 一般ユーザー用ボタン */}
          <Link
            href="/home"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 w-[150px] text-center"
          >
            一般ユーザー
          </Link>
        </div>

        {/* 戻るボタン（下に中央寄せ） */}
        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 w-[140px] text-center"
          >
            戻る
          </Link>
        </div>
      </form>

      {/* PIN入力ダイアログ */}
      {showPinDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">PINコードを入力してください</h2>
            <input
              type="password"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="border border-gray-300 rounded p-2 w-48 text-center"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleConfirmPin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                確認
              </button>
              <button
                onClick={() => setShowPinDialog(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
