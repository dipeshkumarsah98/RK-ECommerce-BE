import express, { type Express } from "express";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";
import { swaggerSpec } from "./lib/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { corsHandler } from "./middlewares/cors.middleware.js";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(corsHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Affiliate E-Commerce API Docs",
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(swaggerSpec);
});

app.use("/api", router);

app.use(errorHandler);

export default app;
