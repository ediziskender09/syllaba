import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "@/auth.config";
import { consumeLoginToken } from "@/lib/email-verification";
import { prisma } from "@/lib/prisma";

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
        const email = String(raw?.email ?? "")
          .toLowerCase()
          .trim();
        const password = String(raw?.password ?? "");
        const loginToken = String(raw?.loginToken ?? "").trim();

        if (!email) return null;

        if (loginToken.length >= 20) {
          const user = await consumeLoginToken(email, loginToken);
          if (!user?.emailVerified) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        if (password.length < 8) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.hashedPassword || !user.emailVerified) return null;

        const valid = await bcrypt.compare(password, user.hashedPassword);
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
