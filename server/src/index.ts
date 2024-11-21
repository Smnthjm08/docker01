import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", (req, res) => {
  res.json({
    message: "Healthy server",
  });
});

app.get("/get", (req, res) => {
  res.json({
    message: "Hello Broo",
  });
});

app.get("/get/new", (req, res) => {
  res.json({
    message: "Hello Broo",
  });
});

app.post("/", async (req, res) => {
  await client.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({
    message: "Done signing up!",
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
