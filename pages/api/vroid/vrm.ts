import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchVRMModel } from '../../../lib/vroid-hub-api';
import { getAccessToken } from '../../../lib/auth';

type Query = {
  id?: string;
};

// モデルのurlを取得してきて、クライアント側でリダイレクトさせる
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as Query;

  if (!id) {
    return res.status(400).json({ message: 'please specify the id.' });
  }

  const token = await getAccessToken(req);

  // tokenが取れなかった時は401
  if (!token) {
    return res.status(401).json({ message: 'connot get access token!' });
  }

  const redirectUrl: string = await fetchVRMModel(id as string, token);
  return res.redirect(redirectUrl);
}
