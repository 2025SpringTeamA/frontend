"use client";

import { useState } from "react";
import { Button, Input } from "@headlessui/react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 検索処理をここに書く
    console.log("検索クエリ:", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center max-w-md mx-auto mt-4 space-x-4"
    >
      <Input
        type="text"
        placeholder="検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white/80 text-gray-800 placeholder-gray-500 border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <Button
        type="submit"
        className="px-4 py-2 text-white bg-green-300 rounded-r-md hover:bg-green-400"
      >
        検索
      </Button>
    </form>
  );
}
