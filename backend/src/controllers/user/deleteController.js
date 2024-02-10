const User = require('../../models/users.js');

module.exports.destroy = async(req, res) => {

    var users = await User.destroy({
        where: {
            id: req.params.id
        },
    });
    if (users) {
        return res.status(200).json({
            message: "Record Deleted Successfully",
        });
    } else {
        return res.status(400).json({
            message: "No Record Found",
        });
    }
}