import { NextResponse } from "next/server";
import { getConditions } from "@/lib/conditions";
import { tours } from "@/lib/tours";

// Live paddling conditions per location. Cached ~15 min via fetch revalidation.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("location") === "kotor" ? "kotor" : "budva";
  const tour = tours.find((t) => t.location.conditions.key === key)!;
  const { lat, lng } = tour.location.conditions;

  const conditions = await getConditions(lat, lng, tour.place);
  return NextResponse.json(conditions, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
  });
}
