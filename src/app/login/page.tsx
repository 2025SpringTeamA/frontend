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
    if (pinCode === process.env.NEXT_PUBLIC_ADMIN_PIN) {
      router.push("/admin-home");
    } else {
      alert("PINコードが間違っています！");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8 pt-16 gap-10">
      <h1 className="text-3xl font-bold bg-[#226b22] text-[#f6e64c] px-10 py-4 rounded">
        ログイン
      </h1>

      <form className="flex flex-col gap-6 w-[320px]">
        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-3 rounded">
          ユーザー名：
          <input
            type="text"
            className="w-full mt-2 p-2 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <label className="bg-[#226b22] text-[#f6e64c] px-4 py-3 rounded">
          パスワード：
          <input
            type="password"
            className="w-full mt-2 p-2 rounded"
            style={{ background: "white", color: "black" }}
          />
        </label>

        <div className="flex justify-between">
          <button
            onClick={handleAdminClick}
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] w-[150px] text-center"
          >
            管理ユーザー
          </button>

          <Link
            href="/home"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] w-[150px] text-center"
          >
            一般ユーザー
          </Link>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="bg-[#226b22] text-[#f6e64c] px-6 py-2 rounded hover:bg-[#1a561a] w-[140px] text-center"
          >
            戻る
          </Link>
        </div>
      </form>

      {showPinDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100">
          <div className="bg-white text-black p-8 rounded flex flex-col items-center gap-4 border border-black">
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
                className="bg-[#226b22] text-[#f6e64c] px-4 py-2 rounded hover:bg-[#1a561a]"
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
