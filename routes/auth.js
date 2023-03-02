"use strict";

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signin/admin", authController.signInAdmin);
module.exports = router;
