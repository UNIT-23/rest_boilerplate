import express from "express"
import { userSignup } from "../controller/userController"
const router = express.Router();

router.post("/", userSignup);
module.exports = router;
