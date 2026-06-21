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

    // 1. Coba upload ke Supabase Storage (bucket 'hero-images')
    try {
      const supabase = await createClient();
      
      const { data, error } = await supabase.storage
        .from("hero-images")
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage
          .from("hero-images")
          .getPublicUrl(filename);
        
        return NextResponse.json({ url: publicUrl });
      }
    } catch (storageErr) {
      console.warn("Supabase Storage upload failed, falling back to local filesystem:", storageErr);
    }

    // 2. Fallback: Simpan ke folder public lokal (fs)
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
