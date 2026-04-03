import { Router } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import productsRouter from "./products.js";
import stockRouter from "./stock-movements.js";
import ordersRouter from "./orders.js";
import paymentsRouter from "./payments.js";
import codVerificationsRouter from "./cod-verifications.js";
import affiliatesRouter from "./affiliates.js";
import earningsRouter from "./earnings.js";
import adminRouter from "./admin.js";
import addressesRouter from "./addresses.js";
import vendorsRouter from "./vendors.js";

const router = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/stock-movements", stockRouter);
router.use("/orders", ordersRouter);
router.use("/payments", paymentsRouter);
router.use("/cod-verifications", codVerificationsRouter);
router.use("/affiliates", affiliatesRouter);
router.use("/earnings", earningsRouter);
router.use("/admin", adminRouter);
router.use("/addresses", addressesRouter);
router.use("/vendors", vendorsRouter);

export default router;
