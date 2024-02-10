const Role = require('../../models/roles.js');
const sequelize = require('sequelize');
const Op = sequelize.Op

module.exports.index = async(req,res) => {

    const getPagination = (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? (page - 1) * limit : 0;
        return { limit, offset };
    };

    const getPagingData = async(data, page, limit) => {

        const { count: totalItems, rows: Role } = data;
        const currentPage = page ? page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, Role, totalPages, currentPage };
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
        const data = await Role.findAndCountAll({
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

    var roles = await Role.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
        },
    });

    if(roles){

        return res.status(200).json({
            roles: roles
        });
    }else{

        return res.status(200).json({
            "message": "No record found"
        });

    }
}