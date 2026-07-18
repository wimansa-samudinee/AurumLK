import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "./prisma.js";

dotenv.config();

async function seed() {
  await prisma.inquiry.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.center.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const customerPassword = await bcrypt.hash("Customer123!", 10);
  const businessPassword = await bcrypt.hash("Business123!", 10);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@aurumlk.com",
      password: adminPassword,
      role: "ADMIN",
      approved: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: customerPassword,
      role: "CUSTOMER",
      approved: true,
    },
  });

  const business = await prisma.user.create({
    data: {
      name: "Gold Star Finance",
      email: "contact@goldstar.lk",
      password: businessPassword,
      role: "BUSINESS",
      businessName: "Gold Star Finance",
      licenseNumber: "CB/PL/2009/123",
      approved: true,
    },
  });

  const center = await prisma.center.create({
    data: {
      name: "Gold Star Finance",
      description: "Premium gold loan center with fast approval and flexible terms.",
      address: "No. 12, Main Street, Colombo",
      city: "Colombo",
      phone: "+94 11 234 5678",
      website: "https://goldstar.lk",
      rating: 4.7,
      branches: {
        create: [
          {
            name: "Colombo Head Office",
            address: "No. 12, Main Street, Colombo",
            city: "Colombo",
            phone: "+94 11 234 5678",
            openingHours: "Mon-Fri 9:00-18:00",
          },
          {
            name: "Colombo South Branch",
            address: "No. 45, Galle Road, Colombo",
            city: "Colombo",
            phone: "+94 11 987 6543",
            openingHours: "Mon-Sat 9:00-17:00",
          },
        ],
      },
      offers: {
        create: [
          {
            title: "Regular Gold Loan",
            type: "Regular",
            rate: 1.2,
            maxAmount: 10000000,
            tenure: "12 months",
            description: "Affordable regular gold loan with low monthly interest.",
            active: true,
            business: { connect: { id: business.id } },
          },
          {
            title: "Express Gold Loan",
            type: "Express",
            rate: 1.5,
            maxAmount: 5000000,
            tenure: "6 months",
            description: "Fast approval loan for urgent cash needs.",
            active: true,
            business: { connect: { id: business.id } },
          },
        ],
      },
    },
    include: { branches: true, offers: true },
  });

  await prisma.inquiry.create({
    data: {
      subject: "Interest rates",
      message: "Can you provide the exact monthly payment for a 7,000,000 LKR loan?",
      customerId: customer.id,
      businessId: business.id,
      offerId: center.offers[0].id,
    },
  });

  console.log("✅ Seed completed: admin, customer, business, center, branch, offers, inquiry.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
