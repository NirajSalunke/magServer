import { Router } from "express";
import { createTreatment, getAllPatients, getPatient, predictReadmission, sendPatientData, updateTreatement } from "../controllers/assistantController.js";
import { get } from "mongoose";
const assistantRouter = Router();

assistantRouter.post("/send-patient-data",sendPatientData);
assistantRouter.put("/update-treatment",updateTreatement);
assistantRouter.get("/get-all-patients",getAllPatients);
assistantRouter.get("/get-patient",getPatient)
assistantRouter.post("/create-treatment",createTreatment)
assistantRouter.post("/send-to-model",predictReadmission)

export default assistantRouter