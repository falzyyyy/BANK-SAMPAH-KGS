import Link from "next/link";
import { Leaf, MapPin, Phone, AtSign, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Profil", path: "/profil" },
    { name: "Katalog Harga", path: "/katalog" },
    { name: "Edukasi", path: "/edukasi" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Top CTA Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="label-tag text-[#52b788] border-[#52b788] mb-3">Mari Bergabung</p>
            <h2 className="font-serif text-2xl md:text-3xl text-white">
              Peduli lingkungan bukan pilihan,<br className="hidden md:block" /> tapi kewajiban.
            </h2>
          </div>
          <Link href="/kontak" className="btn-primary shrink-0 rounded-sm">
            Hubungi Kami
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-8 h-8 bg-[#2d6a4f] rounded-sm flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-sm tracking-tight text-white">Bank Sampah KGS</span>
                <span className="text-[#52b788] text-xs font-medium tracking-[0.1em] uppercase">Palembang</span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Kebumen Gemilang Sejahtera, Palembang — Pelopor pengelolaan sampah berkelanjutan yang memberdayakan masyarakat sejak 2015.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/40">
                <MapPin className="w-4 h-4 text-[#52b788] shrink-0 mt-0.5" />
                <span className="text-sm">Jl Sersan Zaini RT.27 No.2819</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <Phone className="w-4 h-4 text-[#52b788] shrink-0" />
                <span className="text-sm">0823 2201 3726</span>
              </div>
              <div className="flex items-center gap-3">
                <AtSign className="w-4 h-4 text-[#52b788] shrink-0" />
                <a
                  href="https://instagram.com/banksampahkgs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-[#52b788] transition-colors link-underline"
                >
                  @banksampahkgs
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-2" />

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-white/20 mb-6">Navigasi</p>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jadwal */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-white/20 mb-6">Jadwal Nabung</p>
            <div className="space-y-4">
              <div className="border border-white/10 rounded-sm p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Hari</p>
                <p className="text-white font-medium">Rabu & Sabtu</p>
              </div>
              <div className="border border-white/10 rounded-sm p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Jam</p>
                <p className="text-white font-medium">14.00 — 16.00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
            &copy; {currentYear} Bank Sampah KGS Palembang — Kebumen Gemilang Sejahtera.
          </p>
          <p className="text-xs text-white/15">banksampahkgspalembang.id</p>
        </div>
      </div>
    </footer>
  );
}
