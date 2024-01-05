import { createAuthApiHandler, stripe } from 'util/ssr';
import { getCustomerId } from 'util/ssr/stripe';

const handler = createAuthApiHandler();

handler.post(async (req, res) => {
  const userId = req.session?.userId!;

  const customerId = await getCustomerId(userId);

  const { url } = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/account`,
  });

  return res.status(200).json({ url });
});

export default handler;
