import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function SabutyanMode() {
  return (
    <>
      <Logo />
      <NavBar />
      <Image
        src="/sabutyan.svg"
        alt="さぶちゃん"
        width={200}
        height={100}
      ></Image>
    </>
  );
}
