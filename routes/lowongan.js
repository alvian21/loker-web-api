"use strict";
const express = require("express");
const lowonganController = require("../controllers/lowonganController");
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
router.post(
  "/create",
  lowonganController.create
);
router.get(
  "/",
  lowonganController.view
);
router.delete(
  "/delete/:id",
  lowonganController.delete
);
router.get(
  "/edit/:id",
  lowonganController.edit
);
router.put(
  "/update/:id",
  lowonganController.update
);
module.exports = router;
