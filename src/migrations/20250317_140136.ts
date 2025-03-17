import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" DROP CONSTRAINT "home_page_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "home_page_meta_meta_image_idx";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "home_page" DROP COLUMN IF EXISTS "meta_image_id";`)
}
