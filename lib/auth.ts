import type { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

/**
 * Gets the OAuth access token from the server-side NextAuth JWT.
 */
export async function getAccessToken(req: NextApiRequest): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is not set');
  }

  const token = await getToken({
    req,
    secret,
  });

  return typeof token?.accessToken === 'string' ? token.accessToken : null;
}
