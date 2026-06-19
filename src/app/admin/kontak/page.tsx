"use client";

import { useEffect, useState } from "react";
import { Contact2, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminKontak() {
  const [address, setAddress] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch("/api/admin/kontak");
        const json = await res.json();
        if (json.data) {
          setAddress(json.data.address || "");
          setWhatsappNumber(json.data.whatsapp_number || "");
          setInstagramHandle(json.data.instagram_handle || "");
        }
      } catch {
        setAddress("Jl Sersan Zaini RT.27 No.2819, Palembang");
        setWhatsappNumber("082322013726");
        setInstagramHandle("@banksampahkgs");
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/kontak", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          whatsapp_number: whatsappNumber,
          instagram_handle: instagramHandle,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan.");
      setMessage({ type: "success", text: "Informasi kontak berhasil disimpan ke database Supabase!" });
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
          <Contact2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Informasi Kontak</h1>
          <p className="text-sm text-slate-500">Ubah alamat operasional, nomor WhatsApp, dan akun Instagram</p>
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Alamat Operasional
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none text-sm"
              placeholder="Contoh: Jl Sersan Zaini RT.27 No.2819, Palembang"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nomor WhatsApp / Telepon
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                placeholder="Contoh: 082322013726"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Instagram Handle
              </label>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                placeholder="Contoh: @banksampahkgs"
                required
              />
            </div>
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
