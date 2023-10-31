import { promisify } from 'node:util';
import { scrypt as _scrypt } from 'node:crypto';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDbClient } from '@/src/db';
import { User } from '@/src/modules/auth/models/user.model';

const scrypt = promisify(_scrypt);

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        // @ts-expect-error
        session.user.id = token.id;
      }

      return session;
    },
    jwt({ account, token, session, user }) {
      if (account) {
        // token.accessToken = account.access_token;
        token.id = user.id;
      }

      return token;
    }
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "text", placeholder: "password" },
      },
      async authorize(credentials, req) {
        const client = await new MongoDbClient().getClient();
        const collection = await client.db().collection('users');

        const user: User | null = await collection.findOne<User>({ email: credentials!.email });
        await client.close();

        if (!user) return null;

        const [storedHash, salt] = user.password.split('.');
        const hash = await scrypt(credentials!.password, salt, 32) as Buffer;

        if (hash.toString('hex') !== storedHash) return null;

        if (user) return { id: user._id.toString(), email: user.email, name: user.firstname };

        return null;
      }
    })
  ]
});