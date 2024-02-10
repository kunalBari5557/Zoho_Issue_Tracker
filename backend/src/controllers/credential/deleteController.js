const Credential = require("../../models/credentials");

module.exports.destroy = async (req, res) => {
  var credentials = await Credential.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (credentials) {
    return res.status(200).json({
      message: "Record Deleted Successfully",
    });
  } else {
    return res.status(400).json({
      message: "No Record Found",
    });
  }
};
