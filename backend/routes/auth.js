import express from "express";

const router = express.Router();

//import controllers
import { showMessage, register, login, getUser } from "../controllers/auth";

router.get("/:message", showMessage);
router.post("/register", register);
router.post("/login", login);
router.get("/getuser/:id", getUser)

// export default router;
//export the router so thatit can be used in other parts of your application
module.exports = router;
