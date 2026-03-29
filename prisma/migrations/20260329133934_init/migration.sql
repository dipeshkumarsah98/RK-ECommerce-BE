-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'AWAITING_VERIFICATION', 'VERIFIED', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED');

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "roles" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_otp_codes" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_products" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "totalStock" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_stock_movements" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "orderId" TEXT,
    "userId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_affiliate_links" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "productId" TEXT,
    "discountType" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "commissionType" TEXT NOT NULL,
    "commissionValue" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_affiliate_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "affiliateId" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "discountAmount" DOUBLE PRECISION NOT NULL,
    "finalAmount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tbl_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_payments" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT,
    "status" "PaymentStatus" NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_cod_verifications" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "verifiedBy" TEXT NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL,
    "customerResponse" TEXT NOT NULL,
    "remarks" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_cod_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_vendor_earnings" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_vendor_earnings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_email_key" ON "tbl_users"("email");

-- CreateIndex
CREATE INDEX "tbl_users_email_idx" ON "tbl_users"("email");

-- CreateIndex
CREATE INDEX "tbl_otp_codes_email_idx" ON "tbl_otp_codes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_products_slug_key" ON "tbl_products"("slug");

-- CreateIndex
CREATE INDEX "tbl_products_slug_idx" ON "tbl_products"("slug");

-- CreateIndex
CREATE INDEX "tbl_stock_movements_productId_idx" ON "tbl_stock_movements"("productId");

-- CreateIndex
CREATE INDEX "tbl_stock_movements_orderId_idx" ON "tbl_stock_movements"("orderId");

-- CreateIndex
CREATE INDEX "tbl_stock_movements_userId_idx" ON "tbl_stock_movements"("userId");

-- CreateIndex
CREATE INDEX "tbl_stock_movements_createdAt_idx" ON "tbl_stock_movements"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_affiliate_links_code_key" ON "tbl_affiliate_links"("code");

-- CreateIndex
CREATE INDEX "tbl_affiliate_links_code_idx" ON "tbl_affiliate_links"("code");

-- CreateIndex
CREATE INDEX "tbl_affiliate_links_vendorId_idx" ON "tbl_affiliate_links"("vendorId");

-- CreateIndex
CREATE INDEX "tbl_affiliate_links_productId_idx" ON "tbl_affiliate_links"("productId");

-- CreateIndex
CREATE INDEX "tbl_orders_userId_idx" ON "tbl_orders"("userId");

-- CreateIndex
CREATE INDEX "tbl_orders_affiliateId_idx" ON "tbl_orders"("affiliateId");

-- CreateIndex
CREATE INDEX "tbl_orders_status_idx" ON "tbl_orders"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_payments_orderId_key" ON "tbl_payments"("orderId");

-- CreateIndex
CREATE INDEX "tbl_payments_orderId_idx" ON "tbl_payments"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_cod_verifications_orderId_key" ON "tbl_cod_verifications"("orderId");

-- CreateIndex
CREATE INDEX "tbl_cod_verifications_orderId_idx" ON "tbl_cod_verifications"("orderId");

-- CreateIndex
CREATE INDEX "tbl_cod_verifications_verifiedBy_idx" ON "tbl_cod_verifications"("verifiedBy");

-- CreateIndex
CREATE INDEX "tbl_vendor_earnings_vendorId_idx" ON "tbl_vendor_earnings"("vendorId");

-- CreateIndex
CREATE INDEX "tbl_vendor_earnings_orderId_idx" ON "tbl_vendor_earnings"("orderId");

-- CreateIndex
CREATE INDEX "tbl_vendor_earnings_affiliateId_idx" ON "tbl_vendor_earnings"("affiliateId");

-- AddForeignKey
ALTER TABLE "tbl_stock_movements" ADD CONSTRAINT "tbl_stock_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tbl_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_stock_movements" ADD CONSTRAINT "tbl_stock_movements_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tbl_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_stock_movements" ADD CONSTRAINT "tbl_stock_movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_affiliate_links" ADD CONSTRAINT "tbl_affiliate_links_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_affiliate_links" ADD CONSTRAINT "tbl_affiliate_links_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tbl_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_orders" ADD CONSTRAINT "tbl_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_orders" ADD CONSTRAINT "tbl_orders_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "tbl_affiliate_links"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_order_items" ADD CONSTRAINT "tbl_order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tbl_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_order_items" ADD CONSTRAINT "tbl_order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tbl_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_payments" ADD CONSTRAINT "tbl_payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tbl_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_cod_verifications" ADD CONSTRAINT "tbl_cod_verifications_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tbl_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_cod_verifications" ADD CONSTRAINT "tbl_cod_verifications_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_earnings" ADD CONSTRAINT "tbl_vendor_earnings_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_earnings" ADD CONSTRAINT "tbl_vendor_earnings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "tbl_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_earnings" ADD CONSTRAINT "tbl_vendor_earnings_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "tbl_affiliate_links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- ============================================
-- CLEANUP (DROP IF EXISTS)
-- ============================================

DROP TRIGGER IF EXISTS trg_stock_movement_insert ON tbl_stock_movements;
DROP TRIGGER IF EXISTS trg_stock_movement_update ON tbl_stock_movements;
DROP TRIGGER IF EXISTS trg_stock_movement_delete ON tbl_stock_movements;
DROP TRIGGER IF EXISTS trg_prevent_negative_stock ON tbl_stock_movements;

DROP FUNCTION IF EXISTS stock_movement_after_insert();
DROP FUNCTION IF EXISTS stock_movement_after_update();
DROP FUNCTION IF EXISTS stock_movement_after_delete();
DROP FUNCTION IF EXISTS update_product_total_stock(UUID);
DROP FUNCTION IF EXISTS prevent_negative_stock();

-- ============================================
-- 1. FUNCTION: Recalculate total_stock
-- ============================================

CREATE OR REPLACE FUNCTION update_product_total_stock(p_product_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tbl_products
  SET total_stock = COALESCE((
    SELECT SUM(
      CASE
        WHEN type = 'IN' THEN quantity
        WHEN type = 'OUT' THEN -quantity
      END
    )
    FROM tbl_stock_movements
    WHERE product_id = p_product_id
  ), 0)
  WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. TRIGGER FUNCTION: AFTER INSERT
-- ============================================

CREATE OR REPLACE FUNCTION stock_movement_after_insert()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_product_total_stock(NEW.product_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 3. TRIGGER FUNCTION: AFTER UPDATE
-- ============================================

CREATE OR REPLACE FUNCTION stock_movement_after_update()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_product_total_stock(NEW.product_id);

  IF OLD.product_id IS DISTINCT FROM NEW.product_id THEN
    PERFORM update_product_total_stock(OLD.product_id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. TRIGGER FUNCTION: AFTER DELETE
-- ============================================

CREATE OR REPLACE FUNCTION stock_movement_after_delete()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_product_total_stock(OLD.product_id);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. ATTACH TRIGGERS
-- ============================================

CREATE TRIGGER trg_stock_movement_insert
AFTER INSERT ON tbl_stock_movements
FOR EACH ROW
EXECUTE FUNCTION stock_movement_after_insert();

CREATE TRIGGER trg_stock_movement_update
AFTER UPDATE ON tbl_stock_movements
FOR EACH ROW
EXECUTE FUNCTION stock_movement_after_update();

CREATE TRIGGER trg_stock_movement_delete
AFTER DELETE ON tbl_stock_movements
FOR EACH ROW
EXECUTE FUNCTION stock_movement_after_delete();

-- ============================================
-- 6. PREVENT NEGATIVE STOCK
-- ============================================

CREATE OR REPLACE FUNCTION prevent_negative_stock()
RETURNS TRIGGER AS $$
DECLARE
  current_stock INT;
BEGIN
  SELECT total_stock INTO current_stock
  FROM tbl_products
  WHERE id = NEW.product_id;

  IF NEW.type = 'OUT' AND current_stock < NEW.quantity THEN
    RAISE EXCEPTION 'Insufficient stock for product %', NEW.product_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_negative_stock
BEFORE INSERT ON tbl_stock_movements
FOR EACH ROW
EXECUTE FUNCTION prevent_negative_stock();
