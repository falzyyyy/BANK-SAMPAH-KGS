import { Sprout, Box, TriangleAlert, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "Edukasi - Bank Sampah KGS",
  description: "Panduan pemilahan dan pengelolaan sampah Organik, Anorganik, dan B3.",
};

export default function EdukasiPage() {
  const categories = [
    {
      id: "organik",
      name: "Sampah Organik",
      icon: <Sprout className="w-6 h-6 text-white" />,
      accentColor: "#16a34a",
      paleBg: "rgba(22,163,74,0.08)",
      description: "Sampah yang berasal dari sisa makhluk hidup yang mudah terurai secara alami tanpa campur tangan manusia.",
      examples: "Sisa makanan, dedaunan kering, sayuran busuk, kulit buah, tulang ikan, kotoran hewan.",
      dos: [
        "Jadikan kompos atau pupuk organik untuk tanaman.",
        "Gunakan wadah tertutup agar tidak mengundang lalat atau bau menyengat.",
        "Olah menjadi eco-enzyme (khusus untuk sisa sayur dan kulit buah segar).",
      ],
      donts: [
        "Mencampur dengan plastik atau sampah anorganik lainnya.",
        "Dibuang begitu saja ke selokan atau sungai yang dapat menyumbat aliran air.",
        "Membakar daun basah yang dapat menghasilkan asap beracun.",
      ],
    },
    {
      id: "anorganik",
      name: "Sampah Anorganik",
      icon: <Box className="w-6 h-6 text-white" />,
      accentColor: "#2563eb",
      paleBg: "rgba(37,99,235,0.08)",
      description: "Sampah yang sudah tidak dipakai lagi dan sangat sulit atau bahkan tidak bisa terurai secara alami.",
      examples: "Plastik (botol, kantong), kertas, kardus, kaleng, kaca, besi, kain perca.",
      dos: [
        "Pilah dan bersihkan sampah sebelum disetorkan ke bank sampah.",
        "Lipat kardus agar menghemat ruang penyimpanan.",
        "Kreasikan barang bekas menjadi kerajinan daur ulang (upcycle).",
      ],
      donts: [
        "Membakar sampah plastik karena akan melepaskan gas dioksin penyebab kanker.",
        "Membuang sampah plastik ke laut atau tanah karena sulit terurai ratusan tahun.",
        "Menyatukan kertas basah dengan kertas kering (kertas basah nilai jualnya turun).",
      ],
    },
    {
      id: "b3",
      name: "Sampah B3",
      icon: <TriangleAlert className="w-6 h-6 text-white" />,
      accentColor: "#dc2626",
      paleBg: "rgba(220,38,38,0.08)",
      description: "Sampah yang mengandung zat beracun dan berbahaya yang dapat merusak lingkungan serta kesehatan manusia.",
      examples: "Baterai bekas, aki, lampu neon, kemasan pestisida, obat kadaluarsa, limbah medis, oli bekas.",
      dos: [
        "Pisahkan secara ketat dari sampah organik maupun anorganik lainnya.",
        "Gunakan sarung tangan saat menangani limbah medis atau kimia.",
        "Serahkan pada lembaga/tempat pembuangan khusus limbah B3.",
      ],
      donts: [
        "Dibuang ke tempat sampah umum atau ditimbun ke dalam tanah.",
        "Membuang oli bekas atau cairan kimia ke saluran air/selokan.",
        "Membongkar baterai atau aki bekas sendiri di rumah.",
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Page Header */}
      <div className="bg-[#2d6a4f] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-4">
            <span className="label-tag text-[#95d5b2] border-[#95d5b2] inline-block">Pengetahuan</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">Edukasi Sampah</h1>
          <p className="text-white/60 mt-4 max-w-xl text-sm leading-relaxed">
            Pahami jenis-jenis sampah dan cara mengelolanya dengan benar. Satu langkah kecil memilah sampah, menyelamatkan masa depan bumi.
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-6">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className="overflow-hidden rounded-sm"
            style={{ border: "1px solid var(--border-default)" }}
          >
            {/* Category header strip */}
            <div
              className="px-6 py-5 flex items-center gap-4"
              style={{ backgroundColor: cat.paleBg, borderBottom: "1px solid var(--border-default)" }}
            >
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                style={{ backgroundColor: cat.accentColor }}
              >
                {cat.icon}
              </div>
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: cat.accentColor, opacity: 0.7 }}
                >
                  {String(index + 1).padStart(2, "0")} / Kategori
                </p>
                <h2
                  className="font-serif text-xl mt-0.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cat.name}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {/* Description */}
              <div
                className="p-6 md:p-8"
                style={{ borderRight: "1px solid var(--border-default)" }}
              >
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                  {cat.description}
                </p>
                <div
                  className="p-4 rounded-sm"
                  style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-subtle)" }}
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase block mb-2" style={{ color: "var(--text-muted)" }}>
                    Contoh
                  </span>
                  <span className="text-xs italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {cat.examples}
                  </span>
                </div>
              </div>

              {/* Dos */}
              <div
                className="p-6 md:p-8"
                style={{ borderRight: "1px solid var(--border-default)" }}
              >
                <h3
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-5 text-green-600"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Lakukan
                </h3>
                <ul className="space-y-4">
                  {cat.dos.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1 h-1 rounded-full bg-green-500 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="p-6 md:p-8">
                <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-5 text-rose-600">
                  <XCircle className="w-4 h-4" />
                  Hindari
                </h3>
                <ul className="space-y-4">
                  {cat.donts.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1 h-1 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
