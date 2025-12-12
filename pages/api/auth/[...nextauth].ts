import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    {
      id: 'vroid',
      name: 'VRoidHub',
      version: '2.0',
      type: 'oauth',
      authorization: {
        url: `${process.env.NEXT_PUBLIC_VROID_HUB_URL}/authorize/confirm?response_type=code`,
        params: { scope: 'default' }
      },
      token: {
        // v4でheadersを付与する場合独自拡張が必要になった https://next-auth.js.org/configuration/providers/oauth#token-option
        url: `${process.env.NEXT_PUBLIC_VROID_HUB_URL}/oauth/token`,
        params: { grant_type: 'authorization_code' },
        async request({ params, client, checks }) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_VROID_HUB_URL}/oauth/token`, {
              headers: {
                'X-Api-Version': '11' // VRoidHubAPI独自
              },
              method: 'POST',
              body: new URLSearchParams({
                ...params,
                client_id: client.client_id as string,
                client_secret: client.client_secret as string,
                grant_type: 'authorization_code',
                code_verifier: checks.code_verifier as string,
                redirect_uri: client.redirect_uris[0],
              })
            },
          )

          return { tokens: await response.json() };
        }
      },
      userinfo: {
        url: `${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/account`,
        async request({ tokens }) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_VROID_HUB_URL}/api/account`, {
            headers: {
              'Authorization': `${tokens.token_type} ${tokens.access_token}`,
              'X-Api-Version': '11', // VRoidHubAPI独自
            }
          });

          return await response.json();
        },
      },
      checks: ['pkce', 'state'],
      async profile(profile: any) {
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
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account?.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  }
});
