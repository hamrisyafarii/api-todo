import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Hash password user
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 2. Create user
  const user = await prisma.user.create({
    data: {
      name: "Hamri Syafari",
      email: "hamri@example.com",
      password: hashedPassword,
    },
  });

  // 3. Create categories
  const categories = await prisma.category.createMany({
    data: [{ name: "Work" }, { name: "Personal" }, { name: "Urgent" }],
  });

  // 4. Create labels
  const labels = await prisma.label.createMany({
    data: [{ name: "Frontend" }, { name: "Backend" }, { name: "Design" }],
  });

  // 5. Create a task with relations
  const task = await prisma.task.create({
    data: {
      title: "Bikin halaman login",
      description: "Implement UI login pakai React",
      priority: "HIGH",
      status: "IN_PROGRESS",
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      isFavorite: true,
      user: {
        connect: { id: user.id },
      },
      category: {
        connect: { id: 1 },
      },
      labels: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  // Setelah task berhasil dibuat, baru buat comment
  await prisma.comment.createMany({
    data: [
      {
        content: "Mantap bang ini udah jalan",
        taskId: task.id,
      },
      {
        content: "Tolong tambahin validasi ya",
        taskId: task.id,
      },
    ],
  });

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
