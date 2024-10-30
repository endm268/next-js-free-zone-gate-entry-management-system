// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator'; // or any other roles you support
  }

  interface Session {
    user: User & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
  }
}
