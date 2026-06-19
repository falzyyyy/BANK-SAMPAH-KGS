import HeroCarousel from "@/components/ui/HeroCarousel";
import StepCard from "@/components/ui/StepCard";
import {
  Users, Trash2, Sprout, CalendarClock,
  HandHeart, GraduationCap, RefreshCw, BusFront,
  Scale, CircleDollarSign, ArrowRight, CheckCircle2,
  Package
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ThreeDAsset from "@/components/ui/ThreeDAsset";
import ThreeDShapes from "@/components/ui/ThreeDShapes";
import WasteChart from "@/components/ui/WasteChart";
import AnimatedCounter from "@/components/ui/AnimatedCounter";



export const dynamic = "force-dynamic";

export default async function Home() {
  // Default values
  let totalSampah = 1500.5;
  let totalNasabah = 120;
  let updatedAtStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
  let dbSlides: any[] | undefined = undefined;

  try {
    const supabase = await createClient();
    
    // Ambil data statistik dari Supabase
    const { data: statsData } = await supabase
      .from("statistics")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (statsData) {
      totalSampah = Number(statsData.total_sampah);
      totalNasabah = Number(statsData.total_nasabah);
      if (statsData.updated_at) {
        updatedAtStr = new Date(statsData.updated_at).toLocaleDateString("id-ID", {
          day: "numeric", month: "long", year: "numeric"
        });
      }
    }

    // Ambil data hero slideshow dari Supabase
    const { data: heroData } = await supabase
      .from("hero_sections")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (heroData && heroData.length > 0) {
      dbSlides = heroData.map((slide) => {
        // Tentukan sub-slogan berdasarkan slogan agar sesuai konteks
        let subText = "Bersama Bank Sampah KGS Palembang, ubah sampah menjadi nilai ekonomi nyata untuk keluarga dan lingkungan.";
        if (slide.slogan.toLowerCase().includes("langkahmu")) {
          subText = "Memilah sampah hari ini adalah investasi terbaik untuk generasi yang akan datang.";
        } else if (slide.slogan.toLowerCase().includes("waste to empower")) {
          subText = "Bank Sampah KGS Palembang — Kebumen Gemilang Sejahtera. Memberdayakan masyarakat melalui pengelolaan sampah berkelanjutan.";
        } else if (slide.slogan.toLowerCase().includes("menyelamatkan")) {
          subText = "Setiap sampah yang Anda pilah berkontribusi langsung pada pengurangan emisi dan kelestarian ekosistem lokal.";
        }
        
        return {
          id: slide.id,
          image_url: slide.image_url,
          slogan: slide.slogan.includes('\n') ? slide.slogan : slide.slogan.split(', ').join('\n'),
          sub: subText
        };
      });
    }
  } catch (error) {
    console.error("Gagal mengambil data dari Supabase:", error);
  }

  const stats = {
    total_sampah: totalSampah,
    total_nasabah: totalNasabah,
    updated_at: updatedAtStr
  };

  const programs = [
    {
      title: "Tabungan Sampah",
      desc: "Masyarakat menabung sampah anorganik yang telah dipilah untuk mendapatkan nilai tukar dalam bentuk uang.",
      icon: <CircleDollarSign className="w-5 h-5" />,
    },
    {
      title: "Sedekah Sampah",
      desc: "Masyarakat/instansi/Komunitas/perusahaan bisa memberikan sedekah sampah anorganik ke bank sampah.",
      icon: <HandHeart className="w-5 h-5" />,
    },
    {
      title: "Edukasi Lingkungan",
      desc: "Workshop, seminar, dan kampanye peduli lingkungan untuk sekolah, komunitas, dan masyarakat umum.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Produk Daur Ulang",
      desc: "Pembuatan kerajinan, peralatan rumah tangga, dan produk kreatif dari sampah.",
      icon: <RefreshCw className="w-5 h-5" />,
    },
    {
      title: "Fieldtrip & Kunjungan",
      desc: "Kunjungan edukatif ke lokasi Bank Sampah KGS untuk pelajar, mahasiswa, dan mitra.",
      icon: <BusFront className="w-5 h-5" />,
    },
  ];

  const acceptedWaste = [
    { name: "Plastik", icon: <Package className="w-4 h-4" /> },
    { name: "Kardus", icon: <Package className="w-4 h-4" /> },
    { name: "Kaleng Susu", icon: <Package className="w-4 h-4" /> },
    { name: "Kemasan Kaleng", icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* ─── Hero ─── */}
      <HeroCarousel slides={dbSlides} />

      {/* ─── Produk Diterima ─── */}
      <ScrollReveal variant="fade-in" durationMs={800}>
        <section style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-default)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center gap-3 md:gap-8">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase shrink-0" style={{ color: "var(--text-muted)" }}>
                Produk Diterima:
              </span>
              {acceptedWaste.map((w) => (
                <div key={w.name} className="flex items-center gap-2">
                  <span className="text-[#2d6a4f]">{w.icon}</span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{w.name}</span>
                </div>
              ))}
              <Link
                href="/katalog"
                className="ml-auto text-[10px] font-semibold tracking-widest uppercase text-[#2d6a4f] hover:text-[#1b4332] transition-colors flex items-center gap-1 shrink-0"
              >
                Lihat Katalog <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── Statistics ─── */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="mb-4">
                  <span className="label-tag inline-block">Dampak Nyata</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "var(--text-primary)" }}>
                  Angka yang<br />
                  <span className="text-gradient">berbicara sendiri.</span>
                </h2>
              </div>
              <p className="text-sm max-w-xs md:text-right" style={{ color: "var(--text-muted)" }}>
                Terakhir diperbarui pada<br />{stats.updated_at}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D WebGL Canvas */}
            <div className="lg:col-span-5 h-[360px] glass-card rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden neon-glow-green">
              <ThreeDAsset />
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2d6a4f] dark:text-[#52b788] font-bold">
                  Visualisasi Interaktif 3D KGS
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-7">
              <ScrollReveal variant="scale-in" delayMs={150}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Trash2 className="w-5 h-5" />,
                      rawVal: stats.total_sampah,
                      decimals: 1,
                      unit: "Kg",
                      label: "Total Sampah Terkelola / Bulan",
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      rawVal: stats.total_nasabah,
                      decimals: 0,
                      unit: "+",
                      label: "Nasabah Aktif",
                    },
                    {
                      icon: <Sprout className="w-5 h-5" />,
                      rawVal: 4,
                      decimals: 0,
                      unit: "",
                      label: "Jenis Produk Diterima",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-8 group glass-card glow-card-hover rounded-2xl flex flex-col justify-between min-h-[220px]"
                    >
                      <div>
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#2d6a4f] group-hover:text-white"
                          style={{ backgroundColor: "var(--bg-tertiary)", color: "#2d6a4f" }}
                        >
                          {stat.icon}
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="font-serif text-3xl md:text-4xl font-bold text-[#2d6a4f] dark:text-[#52b788]">
                            <AnimatedCounter value={stat.rawVal} decimals={stat.decimals} />
                          </span>
                          {stat.unit && (
                            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                              {stat.unit}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs leading-snug mt-auto" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Waste Statistics Chart Row - Side by Side layout */}
          <div className="mt-12">
            <ScrollReveal variant="fade-up" delayMs={200}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Column: Summary & Environmental Impact Cards */}
                <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-sm border"
                     style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-default)" }}>
                  <div>
                    <div className="mb-3">
                      <span className="label-tag inline-block">Dampak Lingkungan</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                      Kontribusi Penyetoran
                    </h3>
                    <p className="text-xs leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                      Setiap sampah yang Anda pilah dan setorkan ke KGS membantu mengurangi jejak karbon serta menciptakan masa depan kota Palembang yang lebih bersih.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-sm bg-emerald-500/10 text-[#2d6a4f] flex items-center justify-center shrink-0">
                          <Sprout className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Penyelamatan Pohon</h4>
                          <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>Setiap ton kardus yang didaur ulang menyelamatkan sekitar 17 pohon dewasa.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-sm bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                          <RefreshCw className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Penghematan Energi</h4>
                          <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>Daur ulang kaleng aluminium menghemat 95% energi dibanding produksi dari bahan mentah.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-dashed border-neutral-100 dark:border-neutral-800">
                    <Link href="/katalog" className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:gap-3 transition-all duration-300">
                      Cek Nilai Ekonomis Sampah Anda
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Chart */}
                <div className="lg:col-span-8">
                  <WasteChart />
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Jadwal Banner ─── */}
      <ScrollReveal variant="scale-in" durationMs={800}>
        <section className="bg-[#2d6a4f] relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 border border-white/20 rounded-sm flex items-center justify-center shrink-0">
                  <CalendarClock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-[#95d5b2] text-xs font-semibold tracking-[0.12em] uppercase mb-1">
                    Jadwal Nabung Sampah
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">
                    Setiap Rabu & Sabtu
                  </h2>
                </div>
              </div>
              <div className="h-px md:h-12 md:w-px bg-white/20 w-full md:w-auto" />
              <div className="text-center md:text-right">
                <p className="text-white/50 text-sm mb-1">Waktu Operasional</p>
                <p className="text-white text-xl font-semibold tracking-wide">
                  14.00 — 16.00 WIB
                </p>
              </div>
              <Link href="/kontak" className="btn-outline border-white/40 text-white hover:bg-white hover:text-[#2d6a4f] shrink-0">
                Lihat Lokasi
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── Program ─── */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="mb-4">
                  <span className="label-tag inline-block">Program KGS</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "var(--text-primary)" }}>
                  Inisiatif untuk<br />
                  lingkungan & masyarakat.
                </h2>
              </div>
              {/* Interactive 3D Sprout/Leaf */}
              <div className="w-24 h-24 shrink-0 relative overflow-hidden bg-[#2d6a4f]/5 dark:bg-[#2d6a4f]/10 rounded-full border border-[#2d6a4f]/10 flex items-center justify-center">
                <ThreeDShapes shape="leaf" className="w-full h-fullScale scale-110" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delayMs={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, idx) => (
                <div
                  key={idx}
                  className="p-8 group glass-card glow-card-hover rounded-2xl flex flex-col justify-between min-h-[240px]"
                >
                  <div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#2d6a4f] group-hover:text-white"
                      style={{ backgroundColor: "var(--bg-tertiary)", color: "#2d6a4f" }}
                    >
                      {program.icon}
                    </div>
                    <h3 className="font-semibold mb-3 text-base tracking-tight" style={{ color: "var(--text-primary)" }}>
                      {program.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {program.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* View All Card */}
              <div className="bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] p-8 group glow-card-hover rounded-2xl flex flex-col justify-between relative overflow-hidden min-h-[250px] shadow-lg">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-25">
                  <ThreeDShapes shape="torus" />
                </div>
                <div className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center text-white mb-6 z-10 bg-white/5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="z-10">
                  <h3 className="font-serif text-2xl text-white mb-3">Dan masih banyak lagi.</h3>
                  <Link href="/profil" className="inline-flex items-center gap-2 text-[#95d5b2] text-sm font-medium hover:gap-4 transition-all duration-300">
                    Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Target Audiens ─── */}
      <ScrollReveal variant="slide-right">
        <section className="py-16" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-default)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <div className="md:w-1/3 shrink-0">
                <div className="mb-4">
                  <span className="label-tag inline-block">Untuk Siapa?</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "var(--text-primary)" }}>
                  Kami terbuka untuk semua.
                </h2>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border-default)" }}>
                {[
                  { num: "01", label: "Anak Sekolah", sub: "SD hingga Perguruan Tinggi" },
                  { num: "02", label: "Pemerintahan", sub: "Instansi & Dinas terkait" },
                  { num: "03", label: "Perusahaan", sub: "Mitra & Korporasi" },
                ].map((t) => (
                  <div
                    key={t.num}
                    className="px-6 py-6"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <p className="font-mono text-xs text-[#2d6a4f] mb-2">{t.num}</p>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{t.label}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── Alur Setor ─── */}
      <section className="py-24" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="mb-4">
                  <span className="label-tag inline-block">Cara Kerja</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "var(--text-primary)" }}>
                  Alur setor sampah<br />yang simpel.
                </h2>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                  Empat langkah mudah untuk mengubah sampah rumah tangga menjadi nilai nyata.
                </p>
                {/* 3D Recycle Loop structure */}
                <div className="w-20 h-20 shrink-0 relative overflow-hidden bg-[#2d6a4f]/5 dark:bg-[#2d6a4f]/10 rounded-full border border-[#2d6a4f]/10 flex items-center justify-center">
                  <ThreeDShapes shape="recycle" className="scale-110" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delayMs={150}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
              <StepCard number={1} title="Pisahkan Sampah" description="Pisahkan sampah sesuai jenisnya: Plastik, Kardus, Kaleng Susu, dan Kemasan Kaleng dari rumah." icon={<Trash2 className="w-6 h-6" />} />
              <StepCard number={2} title="Bawa ke KGS" description="Bawa sampah terpilah ke kantor operasional Bank Sampah KGS Palembang." icon={<BusFront className="w-6 h-6" />} />
              <StepCard number={3} title="Penimbangan" description="Petugas kami menimbang sampah secara transparan menggunakan timbangan digital." icon={<Scale className="w-6 h-6" />} />
              <StepCard number={4} title="Terima Uang" description="Terima uang tunai atau saldo tabungan sesuai berat sampah yang ditimbang." icon={<CircleDollarSign className="w-6 h-6" />} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <ScrollReveal variant="scale-in">
        <section className="py-24 bg-[#1a1a2e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-white" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6">
                <span className="label-tag text-[#52b788] border-[#52b788] inline-block">Mulai Sekarang</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-8">
                Cek harga sampah<br />
                <span className="text-[#52b788]">hari ini.</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-10">
                Kami menerima Plastik, Kardus, Kaleng Susu, dan Kemasan Kaleng. Lihat daftar lengkap dan harga penukarannya secara transparan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/katalog" className="btn-primary">
                  Lihat Katalog Harga
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/kontak" className="btn-outline border-white/30 text-white hover:bg-white hover:text-[#1a1a2e]">
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

