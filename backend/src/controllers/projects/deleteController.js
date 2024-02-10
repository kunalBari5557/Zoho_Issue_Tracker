const Project = require('../../models/projects.js');

module.exports.destroy = async(req, res) => {

    var roles = await Project.destroy({
        where: {
            id: req.params.id
        },
    });
    if (roles) {
        return res.status(200).json({
            message: "Record Deleted Successfully",
        });
    } else {
        return res.status(400).json({
            message: "No Record Found",
        });
    }
}