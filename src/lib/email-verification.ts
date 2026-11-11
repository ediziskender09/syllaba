import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24; // 24h

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function issueEmailVerification(email: string) {
  const normalized = email.toLowerCase().trim();
  const rawToken = randomBytes(32).toString("hex");
  const token = hashToken(rawToken);
  const expires = new Date(Date.now() + TOKEN_TTL_MS);

  await prisma.verificationToken.deleteMany({
    where: { identifier: normalized },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: normalized,
      token,
      expires,
    },
  });

  await sendVerificationEmail(normalized, rawToken);
}

export async function consumeEmailVerification(email: string, rawToken: string) {
  const normalized = email.toLowerCase().trim();
  const token = hashToken(rawToken);

  const record = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: normalized,
        token,
      },
    },
  });

  if (!record || record.expires < new Date()) {
    if (record) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: normalized,
            token,
          },
        },
      });
    }
    return { ok: false as const, error: "This verification link is invalid or expired." };
  }

  const user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user) {
    return { ok: false as const, error: "Account not found." };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: normalized,
          token,
        },
      },
    }),
  ]);

  return { ok: true as const };
}
