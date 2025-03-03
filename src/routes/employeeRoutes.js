import express from "express";
import {
  getEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeePhoto,
} from "../controllers/employeeController.js";
import uploadMiddleware from "../middleware/upload.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/:id/upload", uploadMiddleware, updateEmployeePhoto);

export default router;
