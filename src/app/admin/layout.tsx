"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Contact2, 
  Image as ImageIcon,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Do not show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/admin" },
    { name: "Statistik", icon: <BarChart3 className="w-5 h-5" />, path: "/admin/statistik" },
    { name: "Katalog Harga", icon: <BookOpen className="w-5 h-5" />, path: "/admin/katalog" },
    { name: "Kontak", icon: <Contact2 className="w-5 h-5" />, path: "/admin/kontak" },
    { name: "Hero Section", icon: <ImageIcon className="w-5 h-5" />, path: "/admin/hero" },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-slate-200 
        transform transition-transform duration-200 ease-in-out
        flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-200 justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/logo_kgs_icon.png"
                alt="Logo Bank Sampah KGS"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg text-slate-800">Admin KGS</span>
          </Link>
          <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                  ${isActive 
                    ? 'bg-green-50 text-kgs-green' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-rose-600 hover:bg-rose-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 sm:px-6 lg:px-8 lg:hidden">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-slate-500 hover:text-slate-700 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold text-slate-800">Admin KGS</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
