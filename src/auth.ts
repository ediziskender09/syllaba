import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import authConfig from "@/auth.config";
import { consumeLoginToken } from "@/lib/email-verification";
import { prisma } from "@/lib/prisma";

const passwordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  loginToken: z.string().optional(),
});

const loginTokenSchema = z.object({
  email: z.string().email(),
  loginToken: z.string().min(20),
  password: z.string().optional(),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        loginToken: { label: "Login token", type: "text" },
      },
      async authorize(raw) {
        const tokenLogin = loginTokenSchema.safeParse(raw);
        if (tokenLogin.success && tokenLogin.data.loginToken) {
          const email = tokenLogin.data.email.toLowerCase().trim();
          const user = await consumeLoginToken(email, tokenLogin.data.loginToken);
          if (!user?.emailVerified) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        const parsed = passwordSchema.safeParse(raw);
        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.hashedPassword) return null;
        if (!user.emailVerified) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.hashedPassword);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
});
