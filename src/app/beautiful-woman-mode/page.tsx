import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";

export default function BeautifulWomanMode() {
  return (
    <>
      <Logo />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">美女モード</h2>
        </div>
      </div>
      <NavBar />
    </>
  );
}
