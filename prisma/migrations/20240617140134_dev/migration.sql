/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `detail_seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "detail_seller_user_id_key" ON "detail_seller"("user_id");
