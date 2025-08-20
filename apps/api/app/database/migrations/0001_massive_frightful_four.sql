CREATE TABLE "simulation" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"property_value" integer NOT NULL,
	"down_payment_percentage" numeric(5, 2) NOT NULL,
	"contract_years" integer NOT NULL,
	"annual_interest_rate" numeric(5, 4) NOT NULL,
	"monthly_gross_income" integer,
	"monthly_expenses" integer,
	"down_payment_amount" integer NOT NULL,
	"financed_amount" integer NOT NULL,
	"total_to_save" integer NOT NULL,
	"monthly_savings_amount" integer NOT NULL,
	"monthly_installment" integer,
	"income_commitment_percentage" numeric(5, 2),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "simulation" ADD CONSTRAINT "simulation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "simulation_user_id_idx" ON "simulation" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "simulation_created_at_idx" ON "simulation" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "simulation_user_created_idx" ON "simulation" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "simulation_property_value_idx" ON "simulation" USING btree ("property_value");