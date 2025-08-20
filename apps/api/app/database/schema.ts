import { createId } from '@paralleldrive/cuid2'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  pgTable,
  timestamp,
  boolean,
  text,
  index,
  integer,
  numeric,
} from 'drizzle-orm/pg-core'

const generateId = (prefix: string) => () => `${prefix}_${createId()}`

export const user = pgTable(
  'user',
  {
    id: text('id').primaryKey().$defaultFn(generateId('usr')),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified')
      .$defaultFn(() => false)
      .notNull(),
    image: text('image'),
    createdAt: timestamp('created_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index('user_email_idx').on(table.email),
    index('user_created_at_idx').on(table.createdAt),
    index('user_email_verified_idx').on(table.emailVerified),
  ],
)

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey().$defaultFn(generateId('sess')),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('session_user_id_idx').on(table.userId),
    index('session_token_idx').on(table.token),
    index('session_expires_at_idx').on(table.expiresAt),
    index('session_user_active_idx').on(table.userId, table.expiresAt),
    index('session_ip_address_idx').on(table.ipAddress),
  ],
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey().$defaultFn(generateId('acc')),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
  },
  (table) => [
    index('account_user_id_idx').on(table.userId),
    index('account_provider_account_idx').on(table.providerId, table.accountId),
    index('account_provider_id_idx').on(table.providerId),
    index('account_user_provider_idx').on(table.userId, table.providerId),
    index('account_access_token_expires_idx').on(table.accessTokenExpiresAt),
    index('account_refresh_token_expires_idx').on(table.refreshTokenExpiresAt),
  ],
)

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey().$defaultFn(generateId('vef')),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(
      () => /* @__PURE__ */ new Date(),
    ),
    updatedAt: timestamp('updated_at').$defaultFn(
      () => /* @__PURE__ */ new Date(),
    ),
  },
  (table) => [
    index('verification_identifier_idx').on(table.identifier),
    index('verification_value_idx').on(table.value),
    index('verification_expires_at_idx').on(table.expiresAt),
    index('verification_identifier_value_idx').on(
      table.identifier,
      table.value,
    ),
    index('verification_active_idx').on(table.identifier, table.expiresAt),
  ],
)

export const simulation = pgTable(
  'simulation',
  {
    id: text('id').primaryKey().$defaultFn(generateId('sim')),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    propertyValue: integer('property_value').notNull(),
    downPaymentPercentage: integer('down_payment_percentage').notNull(),
    contractYears: integer('contract_years').notNull(),
    annualInterestRate: integer('annual_interest_rate').notNull(),
    monthlyGrossIncome: integer('monthly_gross_income'),
    monthlyExpenses: integer('monthly_expenses'),
    downPaymentAmount: integer('down_payment_amount').notNull(),
    financedAmount: integer('financed_amount').notNull(),
    totalToSave: integer('total_to_save').notNull(),
    monthlySavingsAmount: integer('monthly_savings_amount').notNull(),
    monthlyInstallment: integer('monthly_installment'),
    incomeCommitmentPercentage: integer('income_commitment_percentage'),
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index('simulation_user_id_idx').on(table.userId),
    index('simulation_created_at_idx').on(table.createdAt),
    index('simulation_user_created_idx').on(table.userId, table.createdAt),
    index('simulation_property_value_idx').on(table.propertyValue),
  ],
)

export type Simulation = InferSelectModel<typeof simulation>
export type NewSimulation = InferInsertModel<typeof simulation>
