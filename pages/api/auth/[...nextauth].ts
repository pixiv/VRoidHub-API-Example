import NextAuth, { Account, Profile, User } from 'next-auth';

export default NextAuth({
  providers: [
    {
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: 'vroid',
      name: 'VRoidHub',
      type: 'oauth',
      version: '2.0',
      scope: 'default',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://hub.vroid.com/oauth/token',
      requestTokenUrl: 'https://hub.vroid.com/oauth/token',
      authorizationUrl: 'https://hub.vroid.com/oauth/authorize?response_type=code',
      profileUrl: 'https://hub.vroid.com/api/account',
      headers: {
        'X-Api-Version': 11,
      },
      async profile(profile: any, tokens) {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        return {
          id: profile.data.user_detail.user.id,
          name: profile.data.user_detail.user.name,
          image: profile.data.user_detail.user.icon.sq170.url,
        };
      },
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = profile.id;
      }
      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },

    async signIn(user: User, account: Account, profile: Profile) {
      return true;
    },
  },
});
