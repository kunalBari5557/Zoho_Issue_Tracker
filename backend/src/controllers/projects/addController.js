const Project = require('../../models/projects.js');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const Joi = require('joi');

module.exports.store = async (req, res) => {
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
    } else {
        const projectExists = await Project.findOne({ where: { projects: projects } });

        if (projectExists) {
            return res.status(400).json({
                'msg': 'Project name already exists!',
                'payload': []
            });
        }

        const createdProject = await Project.create({
            projects: projects,
        }).then(function (resp) {
            return res.status(200).json({
                msg: 'Project inserted successfully!'
            });
        }).catch(function (err) {
            return res.status(400).json({
                msg: 'Please try again!',
            });
        });
    }
};
