const async = require("async");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../models").User;
const output = require("../functions/output.js");
const missingKey = require("../functions/missingKey");

exports.signInAdmin = (req, res) => {
    async.waterfall(
      [
        function checkMissingKey(callback) {
          let missingKeys = [];
          missingKeys = missingKey({
            email: req.body.email,
            password: req.body.password
          });
  
          if (missingKeys.length !== 0) {
            return callback({
              code: "MISSING_KEY",
              data: {
                missingKeys
              }
            });
          }
          callback(null, true);
        },
        function checkAdmin(index, callback) {
          userModel
            .findOne({
              where: {
                email: req.body.email
              }
            })
            .then(res => {
              if (!res) {
                return callback({
                  code: "NOT_FOUND",
                  data: "User invalid"
                });
              }
  
              callback(null, res);
            })
            .catch(err => {
              return callback({
                code: "ERR_DATABASE",
                data: err
              });
            });
        },
        function checkPasswordAdmin(user, callback) {
          var mykey = crypto.createDecipher("aes-128-cbc", "mypassword");
          var mystr = mykey.update(user.password, "hex", "utf8");
          mystr += mykey.final("utf8");
  
          if (mystr !== req.body.password) {
            return callback({
              code: "INVALID_REQUEST",
              data: "Password wrong"
            });
          }
          callback(null, user);
        },
  
        function generateTokenAdmin(user, callback) {
          jwt.sign(
            { user: user.email, password: user.password },
            "secret",
            {
              algorithm: "HS256",
              expiresIn: "1h"
            },
            (err, token) => {
              if (err) {
                return callback({
                  code: "GENRAL_ERR",
                  data: err
                });
              }
              callback(null, token);
            }
          );
        },
  
        function insertTokenToDbAdmin(token, callback) {
          userModel
            .update(
              {
                token: token
              },
              {
                where: {
                  email: req.body.email
                }
              }
            )
            .then(res => {
              return callback(null, {
                code: "OK",
                data: {
                  token: token
                }
              });
            })
            .catch(err => {
              return callback({
                code: "ERR_DATABASE",
                data: err
              });
            });
        }
      ],
      (err, result) => {
        if (err) {
          return output.print(req, res, err);
        }
        return output.print(req, res, result);
      }
    );
  };