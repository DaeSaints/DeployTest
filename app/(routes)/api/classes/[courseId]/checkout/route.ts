import { UserType } from "@/lib/interfaces/user.interface";
import Classes from "@/lib/models/class.model";
import connectDB from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const price = 55;

    connectDB();
    const classCourse = await Classes.findById(courseId)
      .select("_id class ageGroup")
      .exec();

    const userSession = await getServerSession(authOptions);
    if (!userSession?.user)
      return new NextResponse("Unauthorized", { status: 500 });

    const userInfo = userSession.user as UserType;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: `${classCourse.class} CLASS`,
            description: `This class is for ${classCourse.ageGroup} grade level`,
            images: [
              "https://utfs.io/f/115c508b-fd0b-4a82-9fed-de1354e8194e-u4jxn9.png",
            ],
          },
          unit_amount: Math.round(price! * 100),
          recurring: {
            interval: "month",
          },
        },
      },
    ];

    const customer = await stripe.customers.create({
      email: userInfo.email,
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: "subscription",
      success_url: `${process.env.RETURN_URL}/new-enrollment/${courseId}`,
      cancel_url: `${process.env.RETURN_URL}/new-enrollment/${courseId}`,
      metadata: {
        courseId,
        userId: userInfo._id as string,
      },
    });

    return NextResponse.json({ url: session.url });
    // return NextResponse.json({ url: "" });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
