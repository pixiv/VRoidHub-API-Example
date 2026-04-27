import NextAuth from 'next-auth';
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface OAuthConfig {
    scope?: string;
    params: {
      grant_type: 'string'
    }
  }

  interface Profile {
    id?: string;
    scope?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

