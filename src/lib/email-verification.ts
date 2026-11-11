import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24; // 24h
const LOGIN_TOKEN_TTL_MS = 1000 * 60 * 5; // 5m

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function loginIdentifier(email: string) {
  return `login:${email}`;
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

  const rawLoginToken = randomBytes(32).toString("hex");

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
    prisma.verificationToken.deleteMany({
      where: { identifier: loginIdentifier(normalized) },
    }),
    prisma.verificationToken.create({
      data: {
        identifier: loginIdentifier(normalized),
        token: hashToken(rawLoginToken),
        expires: new Date(Date.now() + LOGIN_TOKEN_TTL_MS),
      },
    }),
  ]);

  return { ok: true as const, loginToken: rawLoginToken, email: normalized };
}

export async function consumeLoginToken(email: string, rawToken: string) {
  const normalized = email.toLowerCase().trim();
  const identifier = loginIdentifier(normalized);
  const token = hashToken(rawToken);

  const record = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!record || record.expires < new Date()) {
    if (record) {
      await prisma.verificationToken.delete({
        where: { identifier_token: { identifier, token } },
      });
    }
    return null;
  }

  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier, token } },
  });

  return prisma.user.findUnique({ where: { email: normalized } });
}
