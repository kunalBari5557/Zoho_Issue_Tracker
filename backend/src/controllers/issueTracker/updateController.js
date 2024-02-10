const Issue = require("../../models/issueTracker.js");
const sequelize = require('sequelize');
const Op = sequelize.Op
const Joi = require('joi');

module.exports.update = async(req, res) => {

    const { project_id, issues, status_id } = req.body;

    const schema = Joi.object({
      project_id: Joi.required(),
      issues: Joi.string().required(),
      status_id: Joi.required(),
    });

    const result = schema.validate({
      project_id: project_id,
      issues: issues,
      status_id:status_id
    });

    if (result.error) {
        return res.status(400).json({
            'msg': result.error.details[0].message
        });

    }else{
        const posts = await Issue.update({
          project_id: project_id,
          issues: issues,
          status_id:status_id
            }, {
                where: {
                    id: req.params.id
                },
            })

            return res.status(200).json({
                'msg': 'Issue updated successfully!',
            });
    }

}

