const Credential = require("../../models/credentials");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports.index = async (req, res) => {
  try {
    const data = await Credential.findAll();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};
