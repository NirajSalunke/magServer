import { Router } from "express";
import { createTreatment, getAllPatientOfAssissant, getAllPatients, getPatient, predictReadmission, sendPatientData, updateTreatement } from "../controllers/assistantController.js";
import { get } from "mongoose";
const assistantRouter = Router();

assistantRouter.post("/send-patient-data",sendPatientData);
assistantRouter.put("/update-treatment",updateTreatement,predictReadmission);
assistantRouter.get("/get-all-patients",getAllPatients);
assistantRouter.get("/get-patient",getPatient)
assistantRouter.post("/create-treatment",createTreatment)
assistantRouter.post("/send-to-model",predictReadmission)
assistantRouter.get("/get-all-patients-of-assistant",getAllPatientOfAssissant)
export default assistantRouter