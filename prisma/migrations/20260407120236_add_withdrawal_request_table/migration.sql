-- CreateTable
CREATE TABLE "tbl_withdrawal_requests" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "status" TEXT NOT NULL,
    "remarks" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "processedBy" TEXT NOT NULL,

    CONSTRAINT "tbl_withdrawal_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_withdrawal_requests_vendorId_idx" ON "tbl_withdrawal_requests"("vendorId");

-- CreateIndex
CREATE INDEX "tbl_withdrawal_requests_status_idx" ON "tbl_withdrawal_requests"("status");

-- AddForeignKey
ALTER TABLE "tbl_withdrawal_requests" ADD CONSTRAINT "tbl_withdrawal_requests_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_withdrawal_requests" ADD CONSTRAINT "tbl_withdrawal_requests_processedBy_fkey" FOREIGN KEY ("processedBy") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
