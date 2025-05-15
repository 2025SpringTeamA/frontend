"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';


export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { label: 'ホーム', href: '/home' },
        { label: '履歴', href: '/chat-history' },
        { label: 'マイページ', href: '/mypage' },
    ];

    const handleLogout = async () => {
        try {
            // ログアウト処理
            const token = localStorage.getItem("token");

            if(!token){
                console.error("トークンが見つかりません");
                return;
            }

            const res = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(res.ok){
                console.log("ログアウト成功");
                localStorage.removeItem("token")
                router.push("/login");

            }else{
                console.error("ログアウト失敗");
            }
        }catch (error){
            console.error("ログアウト中にエラー", error)
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-[#264653] text-white shadow-md">
            <div className="w-full relative flex items-center justify-between py-3 pr-8 pl-2">
                {/* Logo */}
                <Link href="/home">
                    <Image
                        src="/images/sabuchan_logo.png" // publicフォルダに配置
                        alt="Saburo Diary Logo"
                        width={245}
                        height={30}
                        priority
                    />
                </Link>

                {/* ハンバーガーアイコン（モバイル） */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden focus:outline-none"
                >
                    {menuOpen ? <X size={28} className="text-white"/> : <Menu size={28} className="text-white"/>}
                </button>

                {/* ナビゲーション(PC) */}
                <nav className="hidden md:flex flex-1 justify-center space-x-6 mx-10">
                    {navItems.map((item) =>(
                        <Link 
                            key={item.href}
                            href={item.href}
                            className={`pb-1 border-b-2 transition-colors text-white
                                        hover:border-green-400 
                                        ${pathname === item.href
                                        ? 'border-green-400 font-semibold text-yellow-400'
                                        : 'border-transparent'
                                        }`}>
                                {item.label}
                        </Link>
                    ))}
                </nav>

                {/* ログアウトボタン(PC) */}
                <div className="hidden md:block">
                    <button
                        onClick={handleLogout}
                        className="bg-green-500 hover:bg-green-600 text-[#2d2d2d] font-medium py-2 px-4 rounded-lg transition-colors">
                        ログアウト
                    </button>
                </div>

                {/* モバイルメニュー（開閉式） */}
                {menuOpen && (
                    <div className="md:hidden px-6 pb-4 space-y-2 absolute top-full left-0 w-full bg-[#264653]">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={()=>setMenuOpen(false)}
                                className={`block py-2 border-b border-gray-700
                                            ${pathname === item.href 
                                            ? 'font-semibold text-yellow-400'
                                            :  'text-white'
                                            }`}>
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                            ログアウト
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
