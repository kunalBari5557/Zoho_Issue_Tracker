const Role = require('../../models/roles.js');
const sequelize = require('sequelize');
const Op = sequelize.Op
const Joi = require('joi');


module.exports.store = async(req, res) => {
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

        const role_name = await Role.findOne({ where: { name: name } });

        if(role_name){

            return res.status(400).json({
                'msg': 'Role name already exist!',
                'payload': []
            });

        }

        const roles = await Role.create({
            name:name,
        }).then(function(resp) {

            return res.status(200).json({
                msg: 'Role inserted successfully!'
            });
        }).catch(function(err) {
            return res.status(400).json({
                msg: 'Please try again!',
            });

        });

    }

}