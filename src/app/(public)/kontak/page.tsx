import { MapPin, Phone, AtSign, Send, Clock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Kontak - Bank Sampah KGS Palembang",
  description: "Hubungi operasional Bank Sampah Kebumen Gemilang Sejahtera Palembang.",
};

export default function KontakPage() {
  const contactInfo = {
    address: "Jl Sersan Zaini RT.27 No.2819, Palembang",
    wa_display: "0823 2201 3726",
    wa_link: "https://wa.me/6282322013726",
    instagram: "@banksampahkgs",
    ig_link: "https://instagram.com/banksampahkgs",
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Page Header */}
      <div className="bg-[#2d6a4f] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-4">
            <span className="label-tag text-[#95d5b2] border-[#95d5b2] inline-block animate-slide-right">Reach Us</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight animate-fade-up">Hubungi Kami</h1>
          <p className="text-white/60 mt-4 max-w-xl text-sm leading-relaxed animate-fade-up delay-100">
            Kami siap melayani dan menjawab pertanyaan Anda seputar layanan Bank Sampah KGS Palembang.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Cards */}
          <div className="space-y-3">
            <ScrollReveal variant="fade-up">
              <div className="mb-6">
                <span className="label-tag inline-block">Informasi Kontak</span>
              </div>

              {/* Address */}
              <div
                className="flex gap-5 p-6 rounded-sm mb-3"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                  <MapPin className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Alamat Operasional</p>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{contactInfo.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d6a4f] hover:text-[#1b4332] transition-colors link-underline"
                  >
                    Buka di Google Maps <Send className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div
                className="flex gap-5 p-6 rounded-sm mb-3"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                  <Phone className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>WhatsApp / Telepon</p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{contactInfo.wa_display}</p>
                  <a
                    href={contactInfo.wa_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2 !px-4 !text-xs"
                  >
                    Chat Admin Sekarang
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div
                className="flex gap-5 p-6 rounded-sm mb-3"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                  <AtSign className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Media Sosial</p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                    Ikuti kami untuk mendapatkan informasi terbaru seputar Bank Sampah KGS.
                  </p>
                  <a
                    href={contactInfo.ig_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d6a4f] hover:text-[#1b4332] transition-colors link-underline"
                  >
                    {contactInfo.instagram} <Send className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Jadwal */}
              <div
                className="flex gap-5 p-6 rounded-sm"
                style={{ backgroundColor: "rgba(45,106,79,0.07)", border: "1px solid rgba(45,106,79,0.2)" }}
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5 bg-[#d8f3dc]">
                  <Clock className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-2 text-[#2d6a4f]">Jadwal Operasional</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Setiap Rabu & Sabtu</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Pukul 14.00 — 16.00 WIB</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <div>
            <ScrollReveal variant="fade-up" delayMs={100}>
              <div className="mb-6">
                <span className="label-tag inline-block">Lokasi</span>
              </div>
              <div
                className="overflow-hidden rounded-sm h-[400px] lg:h-full min-h-[400px]"
                style={{ border: "1px solid var(--border-default)" }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Jl%20Sersan%20Zaini%20Palembang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Bank Sampah KGS Palembang"
                  className="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
