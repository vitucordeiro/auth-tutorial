import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import bcryptjs from "bcryptjs"

import { LoginSchema } from "./schemas"

import type { NextAuthConfig } from "next-auth"

import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials){
        const validatedFields = LoginSchema.safeParse(credentials);

        if(validatedFields.success) {
          const { email , password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if(!user || !user.password) return null;
          
          const passwordMatch = await bcryptjs.compare(
            password,
            user.password  
          );
          if(passwordMatch) return user;
        }
        return null;

      }
    })
  ],
} satisfies NextAuthConfig