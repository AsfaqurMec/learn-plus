/**
 * Seeds or updates an admin user in MongoDB.
 *
 * Usage (recommended — avoids storing password in a file):
 *   npm run seed:admin -- you@example.com yourpassword
 *
 * Or set in .env.local:
 *   ADMIN_SEED_EMAIL=you@example.com
 *   ADMIN_SEED_PASSWORD=yourpassword
 *   npm run seed:admin
 */

import { config } from "dotenv";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

async function main() {
  const [argEmail, argPassword] = process.argv.slice(2);
  const email = (
    argEmail ||
    process.env.ADMIN_SEED_EMAIL ||
    ""
  )
    .trim()
    .toLowerCase();
  const password = argPassword || process.env.ADMIN_SEED_PASSWORD || "";

  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI. Add it to .env.local");
    process.exit(1);
  }

  if (!email || !email.includes("@")) {
    console.error(`
Missing admin email. Either:

  npm run seed:admin -- your@email.com yourpassword

Or add to .env.local:

  ADMIN_SEED_EMAIL=your@email.com
  ADMIN_SEED_PASSWORD=yourpassword
`);
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const name =
    (process.env.ADMIN_SEED_NAME || "").trim() ||
    email.split("@")[0] ||
    "Admin";

  const { connectDb } = await import("@/lib/mongodb");
  const { Admin } = await import("@/models/Admin");

  await connectDb();

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await Admin.findOneAndUpdate(
    { email },
    { $set: { passwordHash, name } },
    { upsert: true, returnDocument: "after", runValidators: true },
  ).exec();

  console.log(
    result
      ? `Done. Admin ready: ${email} (created or password updated).`
      : "Unexpected: no document returned.",
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
