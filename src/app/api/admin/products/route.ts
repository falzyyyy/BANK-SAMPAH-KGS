import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

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

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

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
    const { name, description, price, image_url, is_available } = body;

    if (!name) {
      return NextResponse.json({ error: "Nama produk wajib diisi" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{ 
        name, 
        description, 
        price: Number(price) || 0, 
        image_url, 
        is_available: is_available !== undefined ? is_available : true 
      }])
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
    const { id, name, description, price, image_url, is_available } = body;

    if (!id) {
      return NextResponse.json({ error: "ID produk diperlukan" }, { status: 400 });
    }

    // Ambil data produk lama untuk mengecek pergantian gambar
    const { data: oldProduct } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    if (oldProduct && oldProduct.image_url && oldProduct.image_url !== image_url) {
      const oldFilename = getFilenameFromUrl(oldProduct.image_url);
      if (oldFilename) {
        await supabase.storage.from("hero-images").remove([oldFilename]);
      } else {
        await deleteLocalFile(oldProduct.image_url);
      }
    }

    const { data, error } = await supabase
      .from("products")
      .update({ 
        name, 
        description, 
        price: Number(price) || 0, 
        image_url, 
        is_available: is_available !== undefined ? is_available : true 
      })
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

    if (!id) return NextResponse.json({ error: "ID produk diperlukan" }, { status: 400 });

    // Ambil data produk sebelum dihapus untuk mengetahui URL gambarnya
    const { data: product } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    if (product && product.image_url) {
      const filename = getFilenameFromUrl(product.image_url);
      if (filename) {
        await supabase.storage.from("hero-images").remove([filename]);
      } else {
        await deleteLocalFile(product.image_url);
      }
    }

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
