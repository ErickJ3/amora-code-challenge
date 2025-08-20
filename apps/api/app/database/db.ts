import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  host: process.env.DATABASE_HOST as string,
  port: process.env.DATABASE_PORT as unknown as number,
  user: process.env.DATABASE_USERNAME as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
})

export const db = drizzle(pool, { schema })