import { Router } from "express";
import { getReadmission, getTreatment } from "../controllers/inventoryController.js";
const inventoryRouter = Router();

inventoryRouter.get("/get-all-readmisson",getReadmission)
inventoryRouter.get("/get-treatment",getTreatment);

export default inventoryRouter
