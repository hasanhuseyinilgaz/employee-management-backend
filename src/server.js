import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { sequelize } from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/uploads", express.static(join(__dirname, "uploads")));

sequelize.authenticate()
  .then(() => {
    console.log("Successfully connected to the database!");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized!");
  })
  .catch(err => {
    console.error("Database connection error", err);
  });

const PORT = process.env.PORT || 3434;
app.listen(PORT, () => console.log(`Sercer running ${PORT} port`));
