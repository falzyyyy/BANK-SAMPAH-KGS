import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

function getFilenameFromUrl(url: string, bucketName: string = "hero-images") {
  if (!url) return null;
  const separator = `/${bucketName}/`;
  if (url.includes(separator)) {
    const parts = url.split(separator);
    return parts[parts.length - 1];
  }
  return null;
}

async function deleteLocalFile(url: string) {
  if (url.startsWith("/images/hero_section/")) {
    const filename = url.replace("/images/hero_section/", "");
    const filePath = path.join(process.cwd(), "public", "images", "hero_section", filename);
    try {
      await unlink(filePath);
    } catch (e) {
      console.warn("Gagal menghapus berkas lokal:", e);
    }
  }
}

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hero_sections")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { image_url, slogan, is_active, sort_order } = body;

    const { data, error } = await supabase
      .from("hero_sections")
      .insert([{ image_url, slogan, is_active, sort_order: Number(sort_order) || 0 }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, image_url, slogan, is_active, sort_order } = body;

    // Ambil data lama untuk mengecek apakah gambar berubah
    const { data: oldSlide } = await supabase
      .from("hero_sections")
      .select("image_url")
      .eq("id", id)
      .single();

    if (oldSlide && oldSlide.image_url && oldSlide.image_url !== image_url) {
      const oldFilename = getFilenameFromUrl(oldSlide.image_url);
      if (oldFilename) {
        await supabase.storage.from("hero-images").remove([oldFilename]);
      } else {
        await deleteLocalFile(oldSlide.image_url);
      }
    }

    const { data, error } = await supabase
      .from("hero_sections")
      .update({ image_url, slogan, is_active, sort_order: Number(sort_order) || 0 })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });

    // Ambil data slide sebelum dihapus untuk mengetahui URL gambar fisiknya
    const { data: slide } = await supabase
      .from("hero_sections")
      .select("image_url")
      .eq("id", id)
      .single();

    if (slide && slide.image_url) {
      const filename = getFilenameFromUrl(slide.image_url);
      if (filename) {
        await supabase.storage.from("hero-images").remove([filename]);
      } else {
        await deleteLocalFile(slide.image_url);
      }
    }

    const { error } = await supabase.from("hero_sections").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
