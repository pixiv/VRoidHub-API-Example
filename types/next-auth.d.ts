import NextAuth from 'next-auth';
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface OAuthConfig {
    scope?: string;
    params: {
      grant_type: 'string'
    }
  }
}

declare module "next-auth" {
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

