declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      NEXT_PUBLIC_NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_VROID_HUB_URL: string;
    }
  }
}

export {};
