"use client";

import { useState } from "react";
import { Button, Input } from "@headlessui/react";

type Props = {
  onSearch: (query: string) => void;
}

export default function SearchBar({onSearch}:Props) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    console.log("検索クエリ:", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-white/80 text-gray-800 placeholder-gray-500 border border-green-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <Button
        type="submit"
        className="px-4 py-2 text-[#2d2d2d] bg-green-500 rounded-r-md hover:bg-green-500"
      >
        検索
      </Button>
    </form>
  );
}
