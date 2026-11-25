import { NextRequest, NextResponse } from "next/server";

const RATES: Record<string, number> = {
  INR: 1,
  USD: 0.0118,
  EUR: 0.0112,
  GBP: 0.0094,
  JPY: 1.82,
  CHF: 0.0105,
  AED: 0.043,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base") || "INR";
  const target = searchParams.get("target") || "USD";
  const amount = Number(searchParams.get("amount")) || 100000;

  const baseRate = RATES[base] || 1;
  const targetRate = RATES[target] || 0.0118;
  const converted = Math.round((amount / baseRate) * targetRate);

  return NextResponse.json({
    success: true,
    data: {
      base,
      target,
      amount,
      converted,
      rate: targetRate / baseRate,
      updatedAt: new Date().toISOString(),
    },
  });
}
