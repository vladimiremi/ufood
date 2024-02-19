-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userName_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
