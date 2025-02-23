import { Router } from "express";
import { getCumulativeResources, getReadmission, getTreatment } from "../controllers/inventoryController.js";
const inventoryRouter = Router();

inventoryRouter.get("/get-all-readmisson",getReadmission)
inventoryRouter.get("/get-treatment", getTreatment);
inventoryRouter.get("/get-cumulative-resources", getCumulativeResources);


export default inventoryRouter
