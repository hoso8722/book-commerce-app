// 購入履歴の保存
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest, res: NextResponse) {
  const { sessionId } = await req.json();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata!.bookId!
      }
    })
    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata!.bookId!
        },
      });
      return NextResponse.json({ purchase })
    } else {
      return NextResponse.json({ message: "すでに購入済みです"})
    }

    

    // });
  } catch(err) {
    return NextResponse.json(err);
  }
}