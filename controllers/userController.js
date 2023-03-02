const async = require("async");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../models").User;
const output = require("../functions/output.js");
const missingKey = require("../functions/missingKey");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

exports.view = (req, res) => {
    async.waterfall([
        function getView(callback) {
            callback(null, {
                code: "OK",
                data: req.user
            });
        }
    ],
        (err, result) => {
            if (err) {
                return output.print(req, res, err);
            }
            return output.print(req, res, result);
        }
    )
};