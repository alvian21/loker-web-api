const async = require("async");
const lowonganModel = require("../models").Lowongan;
const output = require("../functions/output.js");

exports.lowongan = (req, res) => {
    async.waterfall(
        [
            function viewdata(callback) {
                lowonganModel
                    .findAll({
                        raw: true
                    })
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