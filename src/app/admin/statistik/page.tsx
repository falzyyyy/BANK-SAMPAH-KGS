"use client";

import { useEffect, useState } from "react";
import { BarChart3, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminStatistik() {
  const [totalSampah, setTotalSampah] = useState<number>(0);
  const [totalNasabah, setTotalNasabah] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/statistik");
        const json = await res.json();
        if (json.data) {
          setTotalSampah(Number(json.data.total_sampah));
          setTotalNasabah(Number(json.data.total_nasabah));
        }
      } catch (err) {
        console.warn("Menggunakan nilai default:", err);
        setTotalSampah(1500.5);
        setTotalNasabah(120);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/statistik", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total_sampah: totalSampah, total_nasabah: totalNasabah }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan.");
      setMessage({ type: "success", text: "Statistik berhasil disimpan ke database Supabase!" });
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: `Gagal menyimpan data: ${(err as Error).message}`,
      });
    } finally {
      setSaving(false);
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
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg text-kgs-green">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Statistik</h1>
          <p className="text-sm text-slate-500">Atur jumlah total sampah terkelola dan nasabah aktif</p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border flex gap-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Total Sampah Terkelola (Kg)
            </label>
            <input
              type="number"
              step="any"
              value={totalSampah}
              onChange={(e) => setTotalSampah(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="Contoh: 1500.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Jumlah Nasabah Aktif (Orang)
            </label>
            <input
              type="number"
              value={totalNasabah}
              onChange={(e) => setTotalNasabah(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="Contoh: 120"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-kgs-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
