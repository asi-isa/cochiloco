import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de');
  CREATE TABLE IF NOT EXISTS "home_page_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "home_page_meta_meta_image_idx";
  DO $$ BEGIN
   ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_meta_meta_image_idx" ON "home_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "meta_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_locales" CASCADE;
  ALTER TABLE "home_page" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");
  DROP TYPE "public"."_locales";`)
}
