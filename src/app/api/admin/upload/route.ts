import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat nama file unik dengan timestamp
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;

    let supabaseError: any = null;

    // 1. Coba upload ke Supabase Storage (bucket 'hero-images')
    try {
      const supabase = await createClient();
      
      const { data, error } = await supabase.storage
        .from("hero-images")
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (error) {
        throw error;
      }

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from("hero-images")
          .getPublicUrl(filename);
        
        return NextResponse.json({ url: publicUrl });
      }
    } catch (storageErr: any) {
      supabaseError = storageErr;
      console.warn("Supabase Storage upload failed:", storageErr);
    }

    // 2. Jika di Vercel/Production, kita TIDAK boleh fallback ke local fs (karena read-only)
    const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
    if (isVercel) {
      const errorMsg = supabaseError?.message || "Gagal mengunggah ke Supabase Storage.";
      return NextResponse.json({ 
        error: `Supabase Storage Error: ${errorMsg}. Pastikan bucket bernama 'hero-images' sudah dibuat di dashboard Supabase Anda, diset Public, dan memiliki kebijakan RLS (policies) yang mengizinkan unggah gambar.`
      }, { status: 500 });
    }

    // 3. Fallback: Simpan ke folder public lokal (fs) - hanya berjalan di local dev
    const publicDir = path.join(process.cwd(), "public", "images", "hero_section");
    // Pastikan folder ada
    await mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, filename);
    await writeFile(filePath, buffer);

    const localUrl = `/images/hero_section/${filename}`;
    return NextResponse.json({ url: localUrl });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
