"use strict";
const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const getUserByToken = require("../functions/getUserByToken");
const output = require("../functions/output");
const router = express.Router();

//AUTH MIDDLEWARE
router.use((req, res, next) => {
  if (!req.headers.authorization)
    return output.print(req, res, {
      code: "ERR_ACCESS",
      data: new Error("Not Authorized")
    });

  getUserByToken(req, res, req.headers.authorization, (err, user) => {
    if (err || !user)
      return output.print(req, res, {
        code: "ERR_ACCESS",
        data: new Error("Not Authorized")
      });
    else {
      req.user = user;
      next();
    }
  });
});

router.get(
  "/lowongan",
  dashboardController.lowongan
);

module.exports = router;
