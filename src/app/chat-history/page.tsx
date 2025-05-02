import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";

export default function ChatHistory() {
  return (
    <>
      <Logo />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">チャット履歴</h2>
        </div>
      </div>
      <NavBar />
    </>
  );
}
