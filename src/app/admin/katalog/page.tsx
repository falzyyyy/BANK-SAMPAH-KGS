"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2, Edit3, Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";

type WastePrice = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category_id: number;
  category: { name: string } | null;
};

type Category = {
  id: number;
  name: string;
};

export default function AdminKatalog() {
  const [prices, setPrices] = useState<WastePrice[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formUnit, setFormUnit] = useState("kg");
  const [formCategoryId, setFormCategoryId] = useState<number>(0);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/katalog");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      setCategories(json.categories || []);
      setPrices((json.prices as WastePrice[]) || []);
      if (json.categories && json.categories.length > 0) {
        setFormCategoryId(json.categories[0].id);
      }
    } catch (err) {
      console.warn("Menggunakan data mock:", err);
      const mockCats = [
        { id: 1, name: "Plastik" }, { id: 2, name: "Kardus" },
        { id: 3, name: "Kaleng Susu" }, { id: 4, name: "Kemasan Kaleng" },
      ];
      setCategories(mockCats);
      setFormCategoryId(1);
      setPrices([
        { id: 1, name: "Plastik Botol PET (Bersih)", price: 2500, unit: "kg", category_id: 1, category: { name: "Plastik" } },
        { id: 2, name: "Kardus Bekas (Kering)", price: 1500, unit: "kg", category_id: 2, category: { name: "Kardus" } },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { id: editingId, name: formName, price: formPrice, unit: formUnit, category_id: formCategoryId }
        : { name: formName, price: formPrice, unit: formUnit, category_id: formCategoryId };

      const res = await fetch("/api/admin/katalog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan.");

      setMessage({ type: "success", text: editingId ? "Item katalog berhasil diperbarui!" : "Item katalog baru berhasil ditambahkan!" });
      setFormName(""); setFormPrice(0); setFormUnit("kg"); setEditingId(null);
      await loadData();
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message || "Gagal menyimpan data." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: WastePrice) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormPrice(item.price);
    setFormUnit(item.unit);
    setFormCategoryId(item.category_id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/katalog?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menghapus.");
      setMessage({ type: "success", text: "Item katalog berhasil dihapus!" });
      await loadData();
    } catch (err: unknown) {
      setMessage({ type: "error", text: (err as Error).message });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null); setFormName(""); setFormPrice(0); setFormUnit("kg");
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
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Katalog Harga</h1>
          <p className="text-sm text-slate-500">Kelola daftar harga jenis sampah di website publik</p>
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
          <h2 className="text-lg font-bold text-slate-800">{editingId ? "Edit Item Katalog" : "Tambah Item Baru"}</h2>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Kategori</label>
              <select value={formCategoryId} onChange={(e) => setFormCategoryId(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white" required>
                {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Nama Sampah</label>
              <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" placeholder="Contoh: Botol Plastik Bersih" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Harga (Rp)</label>
                <input type="number" value={formPrice} onChange={(e) => setFormPrice(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" placeholder="2500" required />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Satuan</label>
                <input type="text" value={formUnit} onChange={(e) => setFormUnit(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:ring-2 focus:ring-green-500 text-sm" placeholder="kg" required />
              </div>
            </div>
            <div className="pt-2 flex gap-2">
              <button type="submit" disabled={submitting} className="flex-1 flex justify-center items-center gap-1.5 py-2 px-4 bg-kgs-green text-white text-xs font-semibold uppercase rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : editingId ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {editingId ? "Simpan" : "Tambah"}
              </button>
              {editingId && (<button type="button" onClick={handleCancelEdit} className="py-2 px-4 border border-slate-200 text-slate-600 text-xs font-semibold uppercase rounded-lg hover:bg-slate-50 transition-colors">Batal</button>)}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Daftar Item Saat Ini</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Kategori</th>
                  <th className="px-6 py-3 text-right">Harga</th>
                  <th className="px-6 py-3">Satuan</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-slate-600">{item.category?.name || "Lainnya"}</td>
                    <td className="px-6 py-4 text-right font-bold text-kgs-green">Rp {item.price.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 text-slate-500">/ {item.unit}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {prices.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Belum ada data katalog.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
