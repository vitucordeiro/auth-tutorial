import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER"
}

declare module "next-auth" {
    interface Session{
      user:{
        role: "USER" | "ADMIN" 
    
      } & DefaultSession["user"]
    }
  }

