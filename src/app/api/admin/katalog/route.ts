import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const supabase = await createClient();

    const { data: categories, error: catErr } = await supabase
      .from("waste_categories")
      .select("id, name")
      .order("name", { ascending: true });

    if (catErr) throw catErr;

    const { data: prices, error: priceErr } = await supabase
      .from("waste_prices")
      .select("id, name, price, unit, category_id, category:waste_categories(name)")
      .order("name", { ascending: true });

    if (priceErr) throw priceErr;

    return NextResponse.json({ categories, prices });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { name, price, unit, category_id } = body;

    const { data, error } = await supabase
      .from("waste_prices")
      .insert([{ name, price, unit, category_id }])
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
    const { id, name, price, unit, category_id } = body;

    const { data, error } = await supabase
      .from("waste_prices")
      .update({ name, price, unit, category_id })
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

    const { error } = await supabase.from("waste_prices").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
