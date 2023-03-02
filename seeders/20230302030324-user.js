'use strict';
const crypto = require("crypto");

var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
var mystr = mykey.update("123456", "utf8", "hex");
mystr = mykey.final("hex");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        name: "admin",
        email: "admin@gmail.com",
        password: mystr,
        token: "not set token",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "admin@gmail.com" }, {});
  }
};
