import express from "express";
import {
  registerPatient,
  getAllPatients,
  getPatientById,
  getPatientByPhone,
  updatePatient,
  deletePatient,
  addTreatment,
  removeTreatment,
} from "../controller/patientController.js";
import { upload } from "../middleware/multer.js";
import { addLabResultImage } from "../controller/patientController.js";


import { authenticate } from "../middleware/authMiddleware.js";

const patientRoutes = express.Router();

// -----------------------------
// Protected routes
// -----------------------------

// Create new patient
patientRoutes.post("/", authenticate, registerPatient);

// Get all patients
patientRoutes.get("/", authenticate, getAllPatients);

// Get patient by phone (query param ?phone=123456789)
patientRoutes.get("/search/by-phone", authenticate, getPatientByPhone);

// Add treatment to patient's treatmentPlan
patientRoutes.post("/:id/treatment", authenticate, addTreatment);

// Remove treatment from patient's treatmentPlan by index
patientRoutes.delete("/:id/treatment/:index", authenticate, removeTreatment);

// Get patient by ID
patientRoutes.get("/:id", authenticate, getPatientById);

// Update patient (including reason or entire treatmentPlan)
patientRoutes.put("/:id", authenticate, updatePatient);

// Delete patient
patientRoutes.delete("/:id", authenticate, deletePatient);

patientRoutes.post(
  "/:id/lab-results",
  authenticate,
  upload.single("image"),
  addLabResultImage
);


export default patientRoutes;
