'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lowongan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lowongan.init({
    nama: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    tingkat_pendidikan_minimal: DataTypes.STRING,
    tanggal_dibuka: DataTypes.DATE,
    tanggal_ditutup: DataTypes.DATE,
    kuota: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lowongan',
  });
  return Lowongan;
};