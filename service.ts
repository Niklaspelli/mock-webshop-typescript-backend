import express from "express";
import cors from "cors";
import routes from "./routes/index.ts"; // Ändrat till vanlig statisk import

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Nu ligger dina routes på "http://localhost:5001/products"
app.use("/", routes);

export default app;
