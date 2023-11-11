const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "English"},
        { name: "Mathematics"},
        { name: "Science"},
        { name: "History"},
        { name: "Geography"},
        { name: "Religious Education"},
        { name: "Psychology"},
        { name: "Music"},
        { name: "Design & Technology"},
        { name: "Computing"},
        { name: "Physical Education"},
        { name: "Economics"},
        { name: "Foreign Languages"},
        { name: "Art"},
        { name: "Media Studies"},
        { name: "Business Studies"},
      ]
    });

    console.log("Success");

  } catch (error) {
      console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();