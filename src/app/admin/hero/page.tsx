"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Save, Loader2, CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react";

type HeroSlide = {
  id: number;
  image_url: string;
  slogan: string;
  is_active: boolean;
  sort_order?: number;
};

export default function AdminHero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formImageUrl, setFormImageUrl] = useState("");
  const [formSlogan, setFormSlogan] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSortOrder, setFormSortOrder] = useState<number>(0);
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
      setMessage({ type: "success", text: "Gambar berhasil diunggah!" });
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message || "Gagal mengunggah file." });
    } finally {
      setUploading(false);
    }
  };

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/hero");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSlides(json.data || []);
    } catch (err) {
      console.warn("Menggunakan data default:", err);
      setSlides([
        { id: 1, image_url: "/images/hero_section/hs_1.jpg", slogan: "Peduli lingkungan bukan pilihan tapi kewajiban", is_active: true, sort_order: 1 },
        { id: 2, image_url: "/images/hero_section/hs_2.jpg", slogan: "Satu langkahmu memilah sampah, seribu manfaat untuk bumi", is_active: true, sort_order: 2 },
        { id: 3, image_url: "/images/hero_section/hs_3.jpg", slogan: "From Waste to Empower Each Other", is_active: true, sort_order: 3 },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { id: editingId, image_url: formImageUrl, slogan: formSlogan, is_active: formIsActive, sort_order: formSortOrder }
        : { image_url: formImageUrl, slogan: formSlogan, is_active: formIsActive, sort_order: formSortOrder };

      const res = await fetch("/api/admin/hero", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan.");

      setMessage({ type: "success", text: editingId ? "Slide hero berhasil diperbarui!" : "Slide hero baru berhasil ditambahkan!" });
      setFormImageUrl(""); setFormSlogan(""); setFormIsActive(true); setFormSortOrder(0); setEditingId(null);
      await loadData();
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message || "Gagal menyimpan data." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setFormImageUrl(slide.image_url);
    setFormSlogan(slide.slogan);
    setFormIsActive(slide.is_active);
    setFormSortOrder(slide.sort_order || 0);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus slide ini?")) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/hero?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menghapus.");
      setMessage({ type: "success", text: "Slide hero berhasil dihapus!" });
      await loadData();
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message });
    }
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
          <ImageIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hero Section (Slideshow)</h1>
          <p className="text-sm text-slate-500">Ubah foto latar belakang dan slogan pada halaman utama website</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border flex gap-3 text-sm ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0 text-green-600" /> : <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit space-y-4">
          <h2 className="text-lg font-bold text-slate-800 font-serif">{editingId ? "Edit Slide" : "Tambah Slide Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Gambar (Upload atau URL)</label>
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
                    <Loader2 className="w-4.5 h-4.5 animate-spin text-slate-500" />
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
              <p className="text-[10px] text-slate-400 mt-1">Gunakan path lokal, URL gambar, atau klik tombol Upload untuk mengunggah berkas lokal.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Slogan / Headline</label>
              <textarea rows={3} value={formSlogan} onChange={(e) => setFormSlogan(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none" placeholder="Peduli lingkungan bukan pilihan tapi kewajiban" required />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Urutan Tampilan</label>
              <input 
                type="number" 
                value={formSortOrder} 
                onChange={(e) => setFormSortOrder(Number(e.target.value))} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" 
                placeholder="Contoh: 1 (Lebih kecil tampil lebih dulu)" 
                required 
              />
              <p className="text-[10px] text-slate-400 mt-1">Angka lebih kecil akan ditampilkan lebih dulu (misal: 1, 2, 3).</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_active" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="rounded text-green-600 focus:ring-green-500 w-4 h-4" />
              <label htmlFor="is_active" className="text-sm text-slate-700">Aktifkan Slide ini</label>
            </div>
            <div className="pt-2 flex gap-2">
              <button type="submit" disabled={submitting} className="flex-1 flex justify-center items-center gap-1.5 py-2 px-4 bg-kgs-green text-white text-xs font-semibold uppercase rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : editingId ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {editingId ? "Simpan" : "Tambah"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormImageUrl(""); setFormSlogan(""); setFormIsActive(true); setFormSortOrder(0); }} className="py-2 px-4 border border-slate-200 text-slate-600 text-xs font-semibold uppercase rounded-lg hover:bg-slate-50 transition-colors">Batal</button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-32 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image_url} alt={slide.slogan} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${slide.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {slide.is_active ? "Aktif" : "Tidak Aktif"}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {slide.id}</span>
                  <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">Urutan: {slide.sort_order ?? 0}</span>
                </div>
                <h3 className="font-semibold text-slate-800 text-sm leading-relaxed">&quot;{slide.slogan}&quot;</h3>
                <p className="text-xs text-slate-400 truncate">URL: {slide.image_url}</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto md:self-center justify-end">
                <button onClick={() => handleEdit(slide)} className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors">Edit</button>
                <button onClick={() => handleDelete(slide.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {slides.length === 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-400">Belum ada data slide hero.</div>
          )}
        </div>
      </div>
    </div>
  );
}
