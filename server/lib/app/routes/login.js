import express from "express"
const router = express.Router()
import { userLogin } from "../controller/userController"

router.post("/", userLogin);

module.exports = router;
