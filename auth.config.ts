// auth.config.ts
import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';


// Define the User type to enforce role values
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'moderator';
};

const authConfig: NextAuthConfig = {
  providers: [
   
    CredentialProvider({
      credentials: {
        email: { label: 'Email', type: 'email' } ,
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Mock user data for demonstration
        const users: User[] = [
          {
            id: '1',
            name: 'admin',
            email: 'admin@mfz.com',
            password: 'admin123',
            role: 'admin'
          },
          {
            id: '2',
            name: 'user',
            email: 'user@mfz.com',
            password: 'user123',
            role: 'user'
          }
        ];

        // Find user by email and password
        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/' // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as 'admin' | 'user' | 'moderator'
      };
      return session;
    }
  }
};

export default authConfig;
