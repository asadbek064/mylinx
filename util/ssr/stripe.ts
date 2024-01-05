import prisma from 'util/ssr/prisma'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const getCustomerId = async (userId: string) => {
  console.log(userId);
  
  let customer = await prisma.customer.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!!customer) {
    return customer.id;
  }

  const newCustomer = await stripe.customers.create({
    metadata: {
      userId: userId,
    },
  });

  await prisma.customer.create({
    data: {
      id: newCustomer.id,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newCustomer.id;
};

export default stripe;
