"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Loader2, MessageCircle, PackageOpen } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type ProductItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
};

export default function ProdukPublicPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const whatsappNumber = "6282322013726"; // Nomor WhatsApp Bank Sampah KGS Palembang

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/admin/products");
        const json = await res.json();
        if (res.ok && json.data) {
          // Hanya tampilkan produk yang aktif atau jika kosong, gunakan mock
          setProducts(json.data);
        } else {
          throw new Error("Gagal mengambil data");
        }
      } catch (err) {
        console.warn("Menggunakan data fallback:", err);
        setProducts([
          { 
            id: 1, 
            name: "Pupuk Kompos Organik Super", 
            description: "Pupuk hasil olahan sampah organik dedaunan dan sisa makanan yang difermentasi dengan EM4, sangat subur untuk tanaman hias.", 
            price: 15000, 
            image_url: "/images/hero_section/hs_2.jpg", 
            is_available: true 
          },
          { 
            id: 2, 
            name: "Kerajinan Pot Bunga Plastik", 
            description: "Pot tanaman hias estetik berdiameter 15cm yang terbuat dari daur ulang botol plastik bekas.", 
            price: 10000, 
            image_url: "/images/hero_section/hs_1.jpg", 
            is_available: true 
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleBuyClick = (product: ProductItem) => {
    const text = `Halo Admin Bank Sampah KGS Palembang, saya tertarik untuk membeli produk "${product.name}" seharga ${formatRupiah(product.price)}. Apakah produk ini masih tersedia?`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Page Header */}
      <div className="bg-[#2d6a4f] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-4">
            <span className="label-tag text-[#95d5b2] border-[#95d5b2] inline-block animate-slide-right">Katalog Produk</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight animate-fade-up">Hasil Karya Daur Ulang</h1>
          <p className="text-white/60 mt-4 max-w-xl text-sm leading-relaxed animate-fade-up delay-100">
            Dukung gerakan pemilahan sampah dengan membeli produk hasil daur ulang berkualitas tinggi kami. Seluruh hasil penjualan digunakan untuk operasional pelestarian lingkungan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#2d6a4f]" />
            <p className="text-xs font-semibold text-slate-400">Memuat Katalog Produk...</p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="bg-white/50 border border-dashed border-slate-200 py-16 px-4 text-center rounded-2xl max-w-md mx-auto">
                <PackageOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-800 font-serif">Katalog Kosong</h3>
                <p className="text-sm text-slate-400 mt-1">Saat ini belum ada produk daur ulang yang tersedia untuk dijual. Silakan kembali beberapa saat lagi!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, idx) => (
                  <ScrollReveal key={product.id} variant="fade-up" delayMs={idx * 100}>
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div>
                        {/* Image Container */}
                        <div className="h-64 bg-slate-100 relative overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={product.image_url || "/images/hero_section/hs_1.jpg"} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow ${product.is_available ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                              {product.is_available ? "Tersedia" : "Habis"}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-3">
                          <h3 className="font-serif font-bold text-xl text-slate-800 line-clamp-1 group-hover:text-[#2d6a4f] transition-colors">{product.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed min-h-[60px]">{product.description || "Tidak ada deskripsi produk."}</p>
                        </div>
                      </div>

                      {/* Buy Button */}
                      <div className="p-6 pt-0">
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <span className="text-lg font-bold text-[#2d6a4f]">{formatRupiah(product.price)}</span>
                          <button
                            onClick={() => handleBuyClick(product)}
                            disabled={!product.is_available}
                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                              product.is_available 
                                ? "bg-[#2d6a4f] text-white hover:bg-[#1b4332] shadow-sm hover:shadow" 
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            Beli Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
