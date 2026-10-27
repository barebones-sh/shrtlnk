import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // CLI commands (migrate, db push) use the direct connection when pooling is in place
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
})
