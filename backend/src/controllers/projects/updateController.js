
const Project = require('../../models/projects.js');
const sequelize = require('sequelize');
const Op = sequelize.Op
const Joi = require('joi');

module.exports.update = async(req, res) => {

    var projects = req.body.projects;

    const schema = Joi.object({
        projects: Joi.string().required(),
    });

    const result = schema.validate({
        projects: projects,
    });

    if (result.error) {
        return res.status(400).json({
            'msg': result.error.details[0].message
        });

    }else{
       
        const project_name = await Project.findAll({
            where: {
                projects: projects,
                id: {
                    [Op.ne]: req.params.id
                }
            }
        });

        if (project_name.length > 0) {

            return res.status(404).json({
                'msg': 'Project name already exists',
                'payload': []
            })
        }
        const posts = await Project.update({
            projects: projects,
            }, {
                where: {
                    id: req.params.id
                },
            })

            return res.status(200).json({
                'msg': 'Project updated successfully!',
            });
    }

}