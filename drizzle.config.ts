import { defineConfig } from "drizzle-kit"
require("dotenv").config({ path: ".env.local" })

export default defineConfig({
  schema: "./db/schemas/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!
  },
  schemaFilter: ["public"]
})
