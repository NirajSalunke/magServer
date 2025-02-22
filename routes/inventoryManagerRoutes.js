import { Router } from "express";
import { getReadmission } from "../controllers/inventoryController.js";
const inventoryRouter = Router();

inventoryRouter.get("/get-all-readmisson",getReadmission)
export default inventoryRouter
