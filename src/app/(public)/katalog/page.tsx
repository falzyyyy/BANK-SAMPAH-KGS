import { createClient } from "@/lib/supabase/server";
import { PackageOpen, TrendingUp, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Katalog Harga - Bank Sampah KGS Palembang",
  description: "Daftar harga penukaran sampah di Bank Sampah Kebumen Gemilang Sejahtera Palembang.",
};

type WastePrice = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: { name: string };
};

export default async function KatalogPage() {
  const supabase = await createClient();
  const { data: prices } = await supabase
    .from("waste_prices")
    .select(`id, name, price, unit, category:waste_categories(name)`)
    .order("name", { ascending: true });

  // Data sesuai SRS: Plastik, Kardus, Kaleng Susu, Kemasan Kaleng
  const mockPrices: WastePrice[] = [
    { id: 1, name: "Plastik Botol PET (Bersih)", price: 2500, unit: "kg", category: { name: "Plastik" } },
    { id: 2, name: "Plastik Gelas Cup (Bersih)", price: 3000, unit: "kg", category: { name: "Plastik" } },
    { id: 3, name: "Plastik Keras / Ember Bekas", price: 1500, unit: "kg", category: { name: "Plastik" } },
    { id: 4, name: "Kardus Bekas (Kering)", price: 1500, unit: "kg", category: { name: "Kardus" } },
    { id: 5, name: "Kertas HVS / Buku Bekas", price: 2000, unit: "kg", category: { name: "Kardus" } },
    { id: 6, name: "Kaleng Susu Bekas", price: 3500, unit: "kg", category: { name: "Kaleng Susu" } },
    { id: 7, name: "Kaleng Susu Kecil", price: 3000, unit: "kg", category: { name: "Kaleng Susu" } },
    { id: 8, name: "Kemasan Kaleng Makanan", price: 4000, unit: "kg", category: { name: "Kemasan Kaleng" } },
    { id: 9, name: "Kemasan Kaleng Minuman", price: 4500, unit: "kg", category: { name: "Kemasan Kaleng" } },
  ];

  const displayPrices = prices && prices.length > 0 ? (prices as unknown as WastePrice[]) : mockPrices;
  const groupedPrices = displayPrices.reduce((acc, curr) => {
    const cat = curr.category?.name || "Lainnya";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {} as Record<string, WastePrice[]>);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Page Header */}
      <div className="bg-[#2d6a4f] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-4">
            <span className="label-tag text-[#95d5b2] border-[#95d5b2] inline-block animate-slide-right">Harga Transparan</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight animate-fade-up">Katalog Harga Sampah</h1>
          <p className="text-white/60 mt-4 max-w-xl text-sm leading-relaxed animate-fade-up delay-100">
            Daftar harga penukaran sampah yang berlaku saat ini. Harga dapat berubah sewaktu-waktu mengikuti harga pasar pengepul.
          </p>
          {/* Product tags */}
          <div className="flex flex-wrap gap-2 mt-6 animate-fade-up delay-200">
            {["Plastik", "Kardus", "Kaleng Susu", "Kemasan Kaleng"].map((p) => (
              <span key={p} className="px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Tables */}
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal variant="fade-up">
              {Object.entries(groupedPrices).map(([category, items]) => (
                <div
                  key={category}
                  className="overflow-hidden rounded-sm mb-8 last:mb-0"
                  style={{ border: "1px solid var(--border-default)" }}
                >
                  <div
                    className="px-6 py-4 flex items-center gap-2"
                    style={{ backgroundColor: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-default)" }}
                  >
                    <PackageOpen className="w-4 h-4 text-[#2d6a4f]" />
                    <h2 className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
                      {category}
                    </h2>
                  </div>
                  <div className="overflow-x-auto" style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <table className="w-full text-left">
                      <thead style={{ borderBottom: "1px solid var(--border-default)" }}>
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Jenis Sampah</th>
                          <th className="px-6 py-3 text-xs font-semibold tracking-widest uppercase text-right" style={{ color: "var(--text-muted)" }}>Harga</th>
                          <th className="px-6 py-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Satuan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, i) => (
                          <tr
                            key={item.id}
                            style={{ borderTop: i > 0 ? "1px solid var(--border-subtle)" : "none" }}
                            className="transition-colors duration-150"
                          >
                            <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.name}</td>
                            <td className="px-6 py-4 text-sm font-bold text-right text-[#2d6a4f]">
                              Rp {item.price.toLocaleString("id-ID")}
                            </td>
                            <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>/ {item.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <ScrollReveal variant="fade-up" delayMs={100}>
              {/* Jadwal */}
              <div
                className="p-6 rounded-sm mb-4"
                style={{ backgroundColor: "rgba(45,106,79,0.07)", border: "1px solid rgba(45,106,79,0.2)" }}
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#2d6a4f] mb-2">Jadwal Nabung</p>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Setiap Rabu & Sabtu</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Pukul 14.00 — 16.00 WIB</p>
              </div>

              <div
                className="p-6 rounded-sm mb-4"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#d8f3dc] rounded-sm flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Informasi Harga</h3>
                </div>
                <p className="text-sm leading-relaxed text-justify" style={{ color: "var(--text-secondary)" }}>
                  Harga yang tercantum adalah harga acuan standar. Harga riil dapat dipengaruhi oleh kondisi kebersihan sampah dan fluktuasi harga pasar dari pihak pengepul utama.
                </p>
              </div>

              <div
                className="p-6 rounded-sm"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-sm flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Syarat & Ketentuan</h3>
                </div>
                <ul className="text-sm space-y-3" style={{ color: "var(--text-secondary)" }}>
                  {[
                    "Pastikan sampah sudah dalam keadaan bersih dan kering.",
                    "Pisahkan botol plastik dari tutupnya, bersihkan dari sisa cairan.",
                    "Kardus harus kering, tidak basah atau berminyak.",
                    "Kaleng susu dan kemasan kaleng dalam kondisi bersih.",
                    "Penimbangan dilakukan secara transparan menggunakan timbangan digital.",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

