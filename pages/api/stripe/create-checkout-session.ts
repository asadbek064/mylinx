import { createAuthApiHandler, stripe } from 'util/ssr';
import { getCustomerId } from 'util/ssr/stripe';
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const handler = createAuthApiHandler();

handler.post(async (req, res) => {
  const session = await getServerSession(req,res,authOptions);
  const { price, quantity = 1, metadata = {} } = req.body;

  // @ts-ignore
  if (!price && !session?.user.id) {
    throw new Error('Missing parameter price and userId');
  }
  
  // @ts-ignore
  const userId = session?.user.id as string;

  const customerId = await getCustomerId(userId);

  //@ts-ignore
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer: customerId,
    client_reference_id: userId,
    line_items: [
      {
        price: price,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    subscription_data: {
      trial_from_plan: true,
      metadata: {},
    },
    success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/account`,
    cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/plan`,
  });

  return res.status(200).json({ sessionId: checkoutSession.id });
});

export default handler;
