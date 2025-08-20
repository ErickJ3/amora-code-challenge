import "dotenv/config"
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './app/database/migrations',
  schema: './app/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    port:process.env.DATABASE_PORT as unknown as number,
    user: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    ssl: false,
  },
  verbose: true,
  strict: true,
})