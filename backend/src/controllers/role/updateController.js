
const Role = require('../../models/roles.js');
const sequelize = require('sequelize');
const Op = sequelize.Op
const Joi = require('joi');


module.exports.update = async(req, res) => {

    var name = req.body.name;

    const schema = Joi.object({
        name: Joi.string().required(),
    });

    const result = schema.validate({
        name: name,
    });

    if (result.error) {
        return res.status(400).json({
            'msg': result.error.details[0].message
        });

    }else{
       
        const role_name = await Role.findAll({
            where: {
                name: name,
                id: {
                    [Op.ne]: req.params.id
                }
            }
        });

        if (role_name.length > 0) {

            return res.status(404).json({
                'msg': 'Role name already exists',
                'payload': []
            })
        }
        const posts = await Role.update({
            name: name,
            }, {
                where: {
                    id: req.params.id
                },
            })

            return res.status(200).json({
                'msg': 'Role updated successfully!',
            });
    }

}