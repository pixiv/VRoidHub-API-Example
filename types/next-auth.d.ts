// NextAuth用の型定義
// これがないとpages/api/auth/[...nextauth].tsが型エラーになる

/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface OAuthConfig {
    scope?: string;
    params: {
      grant_type: 'string';
    };
  }

  interface Profile {
    id?: string;
    scope?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
