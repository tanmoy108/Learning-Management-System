import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    console.log("tanmoy",user);
    
    if (!user || !user.id || !user?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });
    
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });
    
    console.log("pp",purchase)
    console.log("cc",course)

    if (purchase) {
      return new NextResponse("Already purchasee", { status: 400 });
    }
    
    if (!course) {
      return new NextResponse("not found", { status: 404 });
    }
    
    console.log("checkpoin1");
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100), // In cents
        },
        quantity: 1,
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customerinStripe = await stripe.customers.create({
        email: user?.emailAddresses?.[0]?.emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customerinStripe.id,
        },
      });
    }

    console.log("hello")
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: line_items,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?successed=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?canceled=1`,
      mode: "payment",
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("api/couse/[courseId]/checkout/route.ts", error);
    return new NextResponse("INternal error", { status: 500 });
  }
}
