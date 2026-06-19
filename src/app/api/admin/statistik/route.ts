import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("statistics")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
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
    const { total_sampah, total_nasabah } = body;

    // Cari row yang ada
    const { data: existing } = await supabase
      .from("statistics")
      .select("id")
      .limit(1);

    let error;
    if (existing && existing.length > 0) {
      const { error: err } = await supabase
        .from("statistics")
        .update({ total_sampah, total_nasabah, updated_at: new Date().toISOString() })
        .eq("id", existing[0].id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from("statistics")
        .insert([{ total_sampah, total_nasabah }]);
      error = err;
    }

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
