-- DropForeignKey
ALTER TABLE "tbl_withdrawal_requests" DROP CONSTRAINT "tbl_withdrawal_requests_processedBy_fkey";

-- AlterTable
ALTER TABLE "tbl_withdrawal_requests" ALTER COLUMN "processedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_withdrawal_requests" ADD CONSTRAINT "tbl_withdrawal_requests_processedBy_fkey" FOREIGN KEY ("processedBy") REFERENCES "tbl_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
