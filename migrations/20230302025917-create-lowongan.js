'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lowongans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      tingkat_pendidikan_minimal: {
        type: Sequelize.STRING
      },
      tanggal_dibuka: {
        type: Sequelize.DATE
      },
      tanggal_ditutup: {
        type: Sequelize.DATE
      },
      kuota: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lowongans');
  }
};