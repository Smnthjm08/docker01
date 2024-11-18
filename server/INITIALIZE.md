
# Express, Node, TypeScript & Prisma Setup

This guide helps you set up an Express server with Node.js, TypeScript, and Prisma ORM to interact with a PostgreSQL database.

## Prerequisites

- Node.js installed
- PostgreSQL running locally or remotely

---

## 1. Initialize Project

```bash
mkdir my-server
cd my-server
npm init -y
npm install express prisma @prisma/client
npm install --save-dev typescript ts-node @types/node @types/express
```

---

## 2. Initialize Prisma

```bash
npx prisma init
```

Set the `DATABASE_URL` in the `.env` file to your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cms?schema=public"
```

---

## 3. Configure TypeScript

```bash
npx tsc --init
```

Use the following `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

## 4. Modify `package.json`

To run and build the server, add the following `scripts` section in `package.json`:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts"
}
```

- **`build`** compiles TypeScript into JavaScript.
- **`start`** runs the compiled JavaScript.
- **`dev`** starts the server using `ts-node` (for development).

---

## 5. Create Express Server

Create the `src` folder and `src/index.ts` file with this code:

```typescript
import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());
const client = new PrismaClient();

app.get("/", (req, res) => res.json({ message: "Healthy server" }));
app.post("/", async (req, res) => {
  await client.user.create({
    data: { email: req.body.email, name: req.body.name },
  });
  res.json({ message: "Done signing up!" });
});

app.listen(3000, () => console.log(`Server is running on port 3000`));
```

---

## 6. Define Prisma Schema

Edit `prisma/schema.prisma` to define the `User` model:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
}
```

---

## 7. Apply Prisma Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 8. Run the Server

For **development**, use:

```bash
npm run dev
```

To **build and run**:

```bash
npm run build
npm start
```

---

## 9. Additional Commands

- **Reset Database**: `npx prisma migrate reset`
- **Deploy Migrations**: `npx prisma migrate deploy`
- **Check Migration Status**: `npx prisma migrate status`

---

## Conclusion

You now have an Express server with TypeScript and Prisma ORM to interact with PostgreSQL. Expand the server with more routes and database models as needed.

---

Now the `package.json` includes the build scripts to run TypeScript code in development and production environments. Let me know if you need any further changes!
