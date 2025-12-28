import { NextResponse } from "next/server";
import { getProducts } from "@/data/products";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(getProducts());
}


