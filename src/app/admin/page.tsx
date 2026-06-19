"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Trash2, TrendingUp, AlertCircle, ShieldAlert, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_sampah: 1500.5,
    total_nasabah: 120,
  });
  const [totalCatalog, setTotalCatalog] = useState(7);
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function checkConnectionAndLoad() {
      try {
        // Test query statistics
        const { data: statsData, error: statsErr } = await supabase
          .from("statistics")
          .select("*")
          .order("id", { ascending: true })
          .limit(1)
          .single();

        if (!statsErr && statsData) {
          setStats({
            total_sampah: Number(statsData.total_sampah),
            total_nasabah: Number(statsData.total_nasabah),
          });
          setIsConnected(true);
        }

        // Test query waste prices count
        const { count, error: countErr } = await supabase
          .from("waste_prices")
          .select("*", { count: "exact", head: true });

        if (!countErr && count !== null) {
          setTotalCatalog(count);
          setIsConnected(true);
        }
      } catch (err) {
        console.error("Supabase connection check failed: ", err);
      } finally {
        setChecking(false);
      }
    }

    checkConnectionAndLoad();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Utama</h1>
          <p className="text-sm text-slate-500">Selamat datang kembali di Admin Panel Bank Sampah KGS Palembang</p>
        </div>
      </div>

      {checking ? (
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm text-slate-600 animate-pulse">
          Memeriksa koneksi Supabase Database...
        </div>
      ) : isConnected ? (
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex gap-3 text-green-800">
          <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
          <div>
            <p className="font-semibold text-sm">Terintegrasi dengan Supabase</p>
            <p className="text-sm opacity-95 mt-1">
              Selamat! Website Anda saat ini aktif terhubung ke database Supabase Anda. Semua perubahan yang Anda lakukan di dashboard ini akan langsung ter-update secara real-time di website publik.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <p className="font-semibold text-sm">Skema Database Belum Dibuat / Kosong</p>
            <p className="text-sm opacity-90 mt-1">
              Kredensial Supabase sudah terbaca di `.env.local`. Namun, tabel database belum dibuat atau masih kosong. Silakan buka **Supabase Dashboard** Anda, masuk ke **SQL Editor**, lalu jalankan (Run) seluruh isi skema dari file <code className="bg-amber-100 px-1 rounded">supabase_schema.sql</code> di folder root proyek ini untuk mengaktifkan sinkronisasi otomatis.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Trash2 className="w-6 h-6 text-kgs-green" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Sampah</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {stats.total_sampah.toLocaleString("id-ID")} Kg
              </h3>
            </div>
          </div>
          <div className="mt-auto pt-2 border-t border-slate-50">
            <a href="/admin/statistik" className="text-sm text-kgs-green hover:underline font-semibold flex items-center gap-1.5">
              Update Statistik <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Nasabah</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {stats.total_nasabah} Orang
              </h3>
            </div>
          </div>
          <div className="mt-auto pt-2 border-t border-slate-50">
            <a href="/admin/statistik" className="text-sm text-blue-600 hover:underline font-semibold flex items-center gap-1.5">
              Update Statistik <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Item Katalog</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {totalCatalog} Item
              </h3>
            </div>
          </div>
          <div className="mt-auto pt-2 border-t border-slate-50">
            <a href="/admin/katalog" className="text-sm text-purple-600 hover:underline font-semibold flex items-center gap-1.5">
              Kelola Harga <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/hero" className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-kgs-green hover:bg-green-50 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-kgs-green group-hover:text-white transition-colors font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Ganti Foto Banner Utama</h4>
              <p className="text-sm text-slate-500">Update foto dan slogan di Beranda</p>
            </div>
          </a>
          <a href="/admin/kontak" className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Update Info Kontak</h4>
              <p className="text-sm text-slate-500">Ubah alamat, nomor WhatsApp, dan Instagram</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
