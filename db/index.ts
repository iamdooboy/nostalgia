import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schemas/schema"

const client = postgres(process.env.DB_CONNECTION_STRING!)
const db = drizzle(client, { schema })

export default db
