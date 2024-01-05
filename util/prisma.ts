import { prisma } from "./ssr";


export async function getStripeCustomerIdByEmail(email: string): Promise<string | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          stripeCustomerId: true,
        },
      });
  
      return user?.stripeCustomerId || '';
    } catch (error) {
      // Handle errors or return a default value
      console.error('Error occurred while fetching user:', error);
      return null;
    }
  }

