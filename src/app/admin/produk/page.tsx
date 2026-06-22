"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  Save, 
  CheckCircle, 
  AlertCircle,
  Package
} from "lucide-react";

type ProductItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
};

export default function AdminProduk() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsAvailable, setFormIsAvailable] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengunggah file.");

      setFormImageUrl(json.url);
      setMessage({ type: "success", text: "Foto produk berhasil diunggah!" });
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message || "Gagal mengunggah file." });
    } finally {
      setUploading(false);
    }
  };

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setProducts(json.data || []);
    } catch (err) {
      console.warn("Gagal memuat data produk:", err);
      // Data Mock jika Supabase kosong / terjadi masalah koneksi
      setProducts([
        { id: 1, name: "Pupuk Kompos Organik Super", description: "Pupuk hasil olahan sampah organik dedaunan dan sisa makanan yang difermentasi dengan EM4, sangat subur untuk tanaman hias.", price: 15000, image_url: "/images/hero_section/hs_2.jpg", is_available: true },
        { id: 2, name: "Kerajinan Pot Bunga Plastik", description: "Pot tanaman hias estetik berdiameter 15cm yang terbuat dari daur ulang botol plastik bekas.", price: 10000, image_url: "/images/hero_section/hs_1.jpg", is_available: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { id: editingId, name: formName, description: formDescription, price: Number(formPrice), image_url: formImageUrl, is_available: formIsAvailable }
        : { name: formName, description: formDescription, price: Number(formPrice), image_url: formImageUrl, is_available: formIsAvailable };

      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan.");

      setMessage({ 
        type: "success", 
        text: editingId ? "Produk berhasil diperbarui!" : "Produk baru berhasil ditambahkan!" 
      });

      setFormName("");
      setFormDescription("");
      setFormPrice("");
      setFormImageUrl("");
      setFormIsAvailable(true);
      setEditingId(null);
      await loadData();
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message || "Gagal menyimpan data." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: ProductItem) => {
    setEditingId(product.id);
    setFormName(product.name);
    setFormDescription(product.description || "");
    setFormPrice(String(product.price));
    setFormImageUrl(product.image_url || "");
    setFormIsAvailable(product.is_available);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menghapus.");
      setMessage({ type: "success", text: "Produk berhasil dihapus!" });
      await loadData();
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message });
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(val);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-kgs-green" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg text-kgs-green">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-serif">Katalog Produk yang Dijual</h1>
          <p className="text-sm text-slate-500">Kelola daftar produk hasil daur ulang atau kompos untuk dijual kepada masyarakat</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border flex gap-3 text-sm ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0 text-green-600" /> : <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Input */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit space-y-4">
          <h2 className="text-lg font-bold text-slate-800 font-serif">{editingId ? "Edit Produk" : "Tambah Produk Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Nama Produk</label>
              <input 
                type="text" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" 
                placeholder="Contoh: Pupuk Kompos Daur Ulang" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Deskripsi Produk</label>
              <textarea 
                rows={3} 
                value={formDescription} 
                onChange={(e) => setFormDescription(e.target.value)} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none" 
                placeholder="Tuliskan spesifikasi, keunggulan, atau ukuran produk..." 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Harga Jual (Rp)</label>
              <input 
                type="number" 
                value={formPrice} 
                onChange={(e) => setFormPrice(e.target.value)} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" 
                placeholder="Contoh: 15000" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Gambar Produk (Upload atau URL)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formImageUrl} 
                  onChange={(e) => setFormImageUrl(e.target.value)} 
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" 
                  placeholder="/images/hero_section/hs_1.jpg" 
                  required 
                />
                <label className="cursor-pointer px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center border border-slate-200 select-none shrink-0 transition-colors">
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                  ) : (
                    "Upload"
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    disabled={uploading}
                  />
                </label>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Unggah berkas foto lokal atau gunakan path URL publik.</p>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="is_available" 
                checked={formIsAvailable} 
                onChange={(e) => setFormIsAvailable(e.target.checked)} 
                className="rounded text-green-600 focus:ring-green-500 w-4 h-4" 
              />
              <label htmlFor="is_available" className="text-sm text-slate-700 select-none">Stok Tersedia / Siap Jual</label>
            </div>

            <div className="pt-2 flex gap-2">
              <button 
                type="submit" 
                disabled={submitting} 
                className="flex-1 flex justify-center items-center gap-1.5 py-2 px-4 bg-kgs-green text-white text-xs font-semibold uppercase rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : editingId ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {editingId ? "Simpan" : "Tambah"}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => { 
                    setEditingId(null); 
                    setFormName(""); 
                    setFormDescription(""); 
                    setFormPrice(""); 
                    setFormImageUrl(""); 
                    setFormIsAvailable(true); 
                  }} 
                  className="py-2 px-4 border border-slate-200 text-slate-600 text-xs font-semibold uppercase rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Produk */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 font-serif">Daftar Produk ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-44 bg-slate-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image_url || "/images/hero_section/hs_1.jpg"} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} 
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded shadow ${product.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.is_available ? "Tersedia" : "Habis"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">{product.description || "Tidak ada deskripsi."}</p>
                    <p className="text-sm font-bold text-kgs-green">{formatRupiah(product.price)}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 border-t border-slate-50 flex gap-2 justify-end">
                  <button 
                    onClick={() => handleEdit(product)} 
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-400">
              <Package className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              Belum ada data produk daur ulang.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
