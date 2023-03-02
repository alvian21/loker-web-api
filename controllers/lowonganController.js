const async = require("async");
const lowonganModel = require("../models").Lowongan;
const output = require("../functions/output.js");
const missingKey = require("../functions/missingKey");

exports.create = (req, res) => {
    async.waterfall([
        function checkMissingKey(callback) {
            let missingKeys = [];
            missingKeys = missingKey({
                nama: req.body.nama,
                deskripsi: req.body.deskripsi,
                tingkat_pendidikan_minimal: req.body.tingkat_pendidikan_minimal,
                tanggal_dibuka: req.body.tanggal_dibuka,
                tanggal_ditutup: req.body.tanggal_ditutup,
                kuota: req.body.kuota
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

        function insert(index, callback) {
            lowonganModel.create({
                nama: req.body.nama,
                deskripsi: req.body.deskripsi,
                tingkat_pendidikan_minimal: req.body.tingkat_pendidikan_minimal,
                tanggal_dibuka: req.body.tanggal_dibuka,
                tanggal_ditutup: req.body.tanggal_ditutup,
                kuota: req.body.kuota
            }).then(res => {
                if (res) {
                    return callback(null, {
                        code: "OK",
                        data: res
                    });
                }
            }).catch(err => {
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
    )
};

exports.view = (req, res) => {
    async.waterfall(
        [
            function viewdata(callback) {
                lowonganModel
                    .findAll({ raw: true })
                    .then(function (lowongan) {
                        if (lowongan) {
                            return callback({
                                code: "OK",
                                data: lowongan
                            });
                        } else {
                            return callback({
                                code: "INVALID_REQUEST",
                                data: "lowongan not found"
                            });
                        }
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

exports.edit = (req, res) => {
    async.waterfall(
        [
            function viewEdit(callback) {
                lowonganModel
                    .findOne({ where: { id: req.params.id } })
                    .then(function (lowongan) {
                        if (lowongan) {
                            return callback({
                                code: "OK",
                                data: lowongan
                            });
                        } else {
                            return callback({
                                code: "INVALID_REQUEST",
                                data: "lowongan not found"
                            });
                        }
                    })
                    .catch(err => {
                        return output.print(req, res, {
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

exports.update = (req, res) => {
    async.waterfall([
        function checkMissingKey(callback) {
            let missingKeys = [];
            missingKeys = missingKey({
                nama: req.body.nama,
                deskripsi: req.body.deskripsi,
                tingkat_pendidikan_minimal: req.body.tingkat_pendidikan_minimal,
                tanggal_dibuka: req.body.tanggal_dibuka,
                tanggal_ditutup: req.body.tanggal_ditutup,
                kuota: req.body.kuota
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

        function update(index, callback) {
            lowonganModel.update({
                nama: req.body.nama,
                deskripsi: req.body.deskripsi,
                tingkat_pendidikan_minimal: req.body.tingkat_pendidikan_minimal,
                tanggal_dibuka: req.body.tanggal_dibuka,
                tanggal_ditutup: req.body.tanggal_ditutup,
                kuota: req.body.kuota
            },
            { where: { id: req.params.id } }
            ).then(res => {
                if (res) {
                    return callback(null, {
                        code: "OK",
                        data: "lowongan has been updated"
                    });
                } else {
                    return callback({
                      code: "INVALID_REQUEST",
                      data: "lowongan not found"
                    });
                  }
            }).catch(err => {
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
    )
};

exports.delete = (req, res) => {
    async.waterfall(
        [
            function deleteData(callback) {
                lowonganModel
                    .destroy({ where: { id: req.params.id } })
                    .then(function (lowongan) {
                        if (lowongan) {
                            return callback({
                                code: "OK",
                                data: "lowongan has been deleted"
                            });
                        } else {
                            return callback({
                                code: "INVALID_REQUEST",
                                data: "lowongan not found"
                            });
                        }
                    })
                    .catch(err => {
                        return output.print(req, res, {
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

