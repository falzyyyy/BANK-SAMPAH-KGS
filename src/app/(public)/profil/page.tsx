import { Calendar, Award, MapPin, Leaf, CheckCircle2, Quote } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileCarousel from "@/components/ui/ProfileCarousel";
import Image from "next/image";

export const metadata = {
  title: "Profil - Bank Sampah KGS Palembang",
  description: "Mengenal lebih dekat Bank Sampah Kebumen Gemilang Sejahtera (KGS) Palembang.",
};

export default function ProfilPage() {
  const profileImages = [
    "/images/profile/doc_1.jpeg",
    "/images/profile/doc_2.jpeg",
    "/images/profile/doc_6.jpeg",
    "/images/profile/doc_7.jpeg",
    "/images/profile/p_1.jpg",
    "/images/profile/p_2.jpg",
    "/images/profile/p_3.jpg",
  ];


  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Page Header */}
      <div className="bg-[#2d6a4f] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-4">
            <span className="label-tag text-[#95d5b2] border-[#95d5b2] inline-block animate-slide-right">Tentang Kami</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight animate-fade-up">
            Profil Bank Sampah KGS
          </h1>
          <p className="text-white/60 mt-4 max-w-xl text-sm leading-relaxed animate-fade-up delay-100">
            Mengenal lebih dekat perjalanan dan tujuan kami dalam menjaga kelestarian lingkungan serta memberdayakan masyarakat Palembang.
          </p>
        </div>
      </div>

      {/* Tentang Kami Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Content */}
              <div className="lg:col-span-7">
                <div className="border-l-4 border-[#2d6a4f] pl-4 mb-6">
                  <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Tentang Bank Sampah KGS Palembang
                  </h2>
                </div>

                <div className="space-y-6 text-sm leading-relaxed mb-10 text-justify" style={{ color: "var(--text-secondary)" }}>
                  <p>
                    <strong style={{ color: "var(--text-primary)" }}>Bank Sampah Kebumen Gemilang Sejahtera (KGS)</strong> merupakan salah satu pelopor pengelolaan sampah berbasis masyarakat di Kota Palembang. Cikal bakal berdirinya bank sampah ini bermula pada tahun 2010 ketika masyarakat setempat mengikuti lomba lingkungan hidup tingkat Kota Palembang dan berhasil meraih <span className="font-bold text-[#2d6a4f]">Juara 1 se-Kota Palembang</span>.
                  </p>
                  <p>
                    Nama &quot;Kebumen Gemilang Sejahtera&quot; diambil dari lokasi berdirinya yang berada di Jalan Kebumen. Berbekal semangat menjaga lingkungan dan meningkatkan kesejahteraan masyarakat, pada tahun <span className="font-bold text-[#2d6a4f]">2015</span> resmi didirikan Bank Sampah Kebumen Gemilang Sejahtera sebagai wadah bagi warga untuk mengelola sampah secara produktif dan bernilai ekonomi.
                  </p>
                  <p>
                    Sejak berdiri, Bank Sampah Kebumen Gemilang Sejahtera terus berupaya mengedukasi masyarakat mengenai pentingnya pengelolaan sampah yang baik. Melalui sistem menabung sampah, masyarakat diajak untuk memilah sampah dari rumah tangga, mengurangi pencemaran lingkungan, serta memperoleh manfaat ekonomi dari sampah yang memiliki nilai jual.
                  </p>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl glass-card glow-card-hover"
                       style={{ borderColor: "var(--border-default)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 text-[#2d6a4f] shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">Berdiri Sejak</p>
                      <p className="text-xl font-bold text-[#2d6a4f] dark:text-[#52b788]">2015</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl glass-card glow-card-hover"
                       style={{ borderColor: "var(--border-default)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-600 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">Juara 1</p>
                      <p className="text-xs font-bold leading-tight" style={{ color: "var(--text-primary)" }}>Lomba Lingkungan Hidup Kota Palembang</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Carousel */}
              <div className="lg:col-span-5">
                <ProfileCarousel images={profileImages} />
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Perjalanan Kami (Timeline) Section */}
      <section className="py-20 border-t border-b" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-default)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2d6a4f]/10 text-[#2d6a4f] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                Jejak Langkah
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                Perjalanan Kami
              </h2>
              {/* Color Segments Line */}
              <div className="flex justify-center items-center gap-1.5 mb-4">
                <span className="w-8 h-1 bg-[#2d6a4f] rounded-full" />
                <span className="w-4 h-1 bg-emerald-400 rounded-full" />
                <span className="w-2 h-1 bg-blue-400 rounded-full" />
              </div>
              <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                Sejarah dan tonggak penting Bank Sampah Kebumen Gemilang Sejahtera
              </p>
            </div>
          </ScrollReveal>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 pl-8 ml-4 space-y-12">
            {[
              {
                year: "2010",
                title: "Juara 1 Lomba Lingkungan",
                desc: "Masyarakat setempat meraih Juara 1 Lomba Lingkungan Hidup tingkat Kota Palembang, memicu semangat pengelolaan sampah yang terstruktur.",
                icon: <Award className="w-5 h-5 text-amber-500" />,
                iconBg: "bg-amber-500/10",
                badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              },
              {
                year: "2015",
                title: "Berdirinya Bank Sampah",
                desc: "Bank Sampah Kebumen Gemilang Sejahtera resmi didirikan sebagai wadah bagi warga untuk mengelola sampah secara produktif dan bernilai ekonomi.",
                icon: <Leaf className="w-5 h-5 text-emerald-600" />,
                iconBg: "bg-emerald-500/10",
                badgeBg: "bg-emerald-500/10 text-[#2d6a4f]",
              },
              {
                year: "Kini",
                title: "Melayani Masyarakat Palembang",
                desc: "Terus berkembang sebagai pelopor pengelolaan sampah berbasis masyarakat, melayani ratusan nasabah aktif di Kota Palembang.",
                icon: <MapPin className="w-5 h-5 text-blue-600" />,
                iconBg: "bg-blue-500/10",
                badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
              },
            ].map((node, i) => (
              <div key={i} className="relative">
                {/* Node Point Indicator */}
                <div className={`absolute -left-[49px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-800 ${node.iconBg}`}>
                  {node.icon}
                </div>

                {/* Timeline Card Content */}
                <ScrollReveal variant="fade-up" delayMs={i * 100}>
                  <div className="p-6 glass-card glow-card-hover rounded-2xl border transition-all duration-300 hover:shadow-md"
                       style={{ borderColor: "var(--border-default)" }}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${node.badgeBg}`}>
                        {node.year}
                      </span>
                      <h3 className="font-serif text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                        {node.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {node.desc}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Direktur */}
      <section className="py-20 max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="scale-in">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1b] rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <Quote className="absolute top-6 right-6 w-20 h-20 text-white opacity-5" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-[#2d6a4f] bg-[#2d6a4f]/20 flex items-center justify-center">
                <span className="text-[#52b788] font-semibold text-xs text-center px-2">Foto Direktur</span>
              </div>
              <div>
                <p className="text-lg md:text-xl font-light leading-relaxed italic text-white/80 mb-6">
                  &quot;Perempuan memiliki peran strategis dalam pengelolaan sampah karena sebagian besar sampah dihasilkan dari sampah rumah tangga. Sekarang perempuan harus peduli lingkungan sebab, sampah paling banyak dihasilkan dari rumah tangga.&quot;
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-white">Welis Fatimah</h3>
                  <p className="text-[#52b788] text-sm">Direktur Bank Sampah Kebumen Gemilang Sejahtera</p>
                  <p className="text-white/30 text-xs mt-1 italic">Dilansir dari Tempo, 22 April 2026</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-white/50 leading-relaxed text-justify">
                Melalui Bank Sampah Kebumen Gemilang Sejahtera, mereka menunjukkan bahwa perjuangan perempuan masa kini tidak hanya di bidang pendidikan, tetapi juga dalam menjaga lingkungan dan mengurangi sampah rumah tangga.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Visi Misi */}
      <section className="py-8 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="mb-4">
            <span className="label-tag inline-block">Arah Kami</span>
          </div>
          <h2 className="font-serif text-3xl mb-10" style={{ color: "var(--text-primary)" }}>Visi & Misi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visi */}
            <div className="p-8 md:p-10 glass-card glow-card-hover rounded-2xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-[#2d6a4f]/10">
                <span className="text-[#2d6a4f] dark:text-[#52b788] font-bold text-sm">V</span>
              </div>
              <h3 className="font-serif text-2xl mb-4" style={{ color: "var(--text-primary)" }}>Visi</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Menjadi pelopor pengelolaan sampah berkelanjutan yang memberdayakan masyarakat serta menciptakan lingkungan bebas sampah untuk generasi mendatang.
              </p>
            </div>

            {/* Misi */}
            <div className="p-8 md:p-10 glass-card glow-card-hover rounded-2xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-[#2d6a4f]/10">
                <span className="text-[#2d6a4f] dark:text-[#52b788] font-bold text-sm">M</span>
              </div>
              <h3 className="font-serif text-2xl mb-4" style={{ color: "var(--text-primary)" }}>Misi</h3>
              <ul className="space-y-3">
                {[
                  "Mengelola sampah melalui prinsip 3R (Reduce, Reuse, Recycle) agar memiliki nilai manfaat dan ekonomi.",
                  "Memberdayakan masyarakat dengan memberikan pelatihan dan pendampingan dalam pengelolaan serta pemanfaatan sampah.",
                  "Membangun kesadaran lingkungan melalui program edukasi, kampanye, dan kegiatan kreatif yang melibatkan semua lapisan masyarakat.",
                  "Mengembangkan produk daur ulang yang inovatif dan ramah lingkungan sebagai sumber pendapatan tambahan.",
                  "Berkolaborasi dengan pemerintah, swasta, dan komunitas untuk menciptakan ekosistem ekonomi sirkular yang kuat dan berkelanjutan.",
                ].map((misi, idx) => (
                  <li key={idx} className="flex gap-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] dark:text-[#52b788] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

      </section>

      {/* Galeri Dokumentasi */}
      <section className="py-20 border-t" style={{ borderColor: "var(--border-default)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="mb-4">
                  <span className="label-tag inline-block">Aktivitas Riil</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: "var(--text-primary)" }}>
                  Galeri Dokumentasi <br />
                  <span className="text-gradient">Kegiatan KGS</span>
                </h2>
              </div>
              <p className="text-xs max-w-sm" style={{ color: "var(--text-muted)" }}>
                Dokumentasi foto kegiatan pelatihan daur ulang, kemitraan internasional KIAT, pos pemberdayaan keluarga, serta edukasi anak-anak.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  src: "/images/profile/doc_1.jpeg",
                  title: "Pelatihan Daur Ulang",
                  desc: "Pembuatan produk kerajinan tangan bernilai ekonomi dari olahan kertas koran oleh ibu-ibu nasabah."
                },
                {
                  src: "/images/profile/doc_2.jpeg",
                  title: "Kemitraan KIAT",
                  desc: "Pelatihan usaha mikro dasar bersama Kemitraan Indonesia Australia untuk Infrastruktur (KIAT)."
                },
                {
                  src: "/images/profile/doc_3.jpeg",
                  title: "Proses Menganyam",
                  desc: "Kreativitas nasabah KGS dalam memilin dan merajut lembaran koran menjadi anyaman fungsional."
                },
                {
                  src: "/images/profile/doc_4.jpeg",
                  title: "Detail Kerajinan",
                  desc: "Proses detail pembentukan produk menggunakan cetakan daur ulang untuk kualitas presisi."
                },
                {
                  src: "/images/profile/doc_5.jpeg",
                  title: "Pengurus & Pembimbing KIAT",
                  desc: "Kolaborasi kepemimpinan dan sanitasi inklusif bersama perwakilan tim ahli kemitraan."
                },
                {
                  src: "/images/profile/doc_6.jpeg",
                  title: "Playdate Keluarga KGS",
                  desc: "Kegiatan edukatif anak-anak dan keluarga nasabah untuk mengenalkan kepedulian lingkungan."
                },
                {
                  src: "/images/profile/doc_7.jpeg",
                  title: "Posdaya & Dongeng Anak",
                  desc: "Pemberdayaan keluarga dan sosialisasi dini melalui dongeng interaktif bertema cinta bumi."
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="group glass-card glow-card-hover rounded-2xl overflow-hidden shadow-sm flex flex-col h-full"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-lg font-bold mb-2 text-[#2d6a4f] dark:text-[#52b788]">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
