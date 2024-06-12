/*
  Warnings:

  - You are about to drop the column `image_uri` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "image_uri";

-- CreateTable
CREATE TABLE "item_image" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "updated_by" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "item_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_image" ADD CONSTRAINT "item_image_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
