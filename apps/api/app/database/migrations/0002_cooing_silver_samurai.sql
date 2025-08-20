DROP INDEX "simulation_user_id_idx";--> statement-breakpoint
DROP INDEX "simulation_created_at_idx";--> statement-breakpoint
DROP INDEX "simulation_user_created_idx";--> statement-breakpoint
DROP INDEX "simulation_property_value_idx";--> statement-breakpoint
ALTER TABLE "simulation" ALTER COLUMN "down_payment_percentage" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "simulation" ALTER COLUMN "annual_interest_rate" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "simulation" ALTER COLUMN "income_commitment_percentage" SET DATA TYPE integer;