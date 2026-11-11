import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const email = `smoke+${Date.now()}@syllaba.test`;

try {
  const hashedPassword = await bcrypt.hash("smoke-test-password", 10);
  const user = await prisma.user.create({
    data: {
      email,
      name: "Smoke Test",
      hashedPassword,
    },
  });

  const found = await prisma.user.findUnique({ where: { email } });
  if (!found || found.id !== user.id) {
    throw new Error("User round-trip failed");
  }

  await prisma.user.delete({ where: { id: user.id } });
  console.log("OK neon postgres round-trip:", email);
} finally {
  await prisma.$disconnect();
}
