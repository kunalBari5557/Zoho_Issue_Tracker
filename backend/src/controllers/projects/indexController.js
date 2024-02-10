const Project = require('../../models/projects.js');
const sequelize = require('sequelize');
const Op = sequelize.Op

module.exports.index = async(req,res) => {

    const getPagination = (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? (page - 1) * limit : 0;
        return { limit, offset };
    };

    const getPagingData = async(data, page, limit) => {

        const { count: totalItems, rows: Project } = data;
        const currentPage = page ? page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, Project, totalPages, currentPage };
    };

    const { page, size, search } = req.query;

    var condition = search ? {
        // id: req.user_id,

        [Op.or]: [
            {
                name: {
                    [Op.like]: `%${req.query.search}%`
                }
            },
        ]
    } : {
        // id: req.user_id,
    };

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await Project.findAndCountAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            where: condition,
            limit,
            offset,
        });

        const response = await getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }

}

module.exports.edit = async(req, res, next) => {

    var projects = await Project.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
        },
    });

    if(projects){

        return res.status(200).json({
            projects: projects
        });
    }else{

        return res.status(200).json({
            "message": "No record found"
        });

    }
}