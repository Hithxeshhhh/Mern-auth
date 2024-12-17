import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserdata } from "../controllers/userController.js";

const useRouter = express.Router();

useRouter.get('/data',userAuth,getUserdata)

export default useRouter;
