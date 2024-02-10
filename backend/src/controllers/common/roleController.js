const Role = require('../../models/roles.js');


module.exports.role = async(req, res) => {
    const roles = await Role.findAll()

    return res.status(200).json({
        'roles':roles
    })
}
