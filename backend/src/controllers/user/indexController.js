const User = require('../../models/users');
const Role = require('../../models/roles');

const sequelize = require('sequelize');
const Op = sequelize.Op

module.exports.index = async(req, res, next) => {
    const getPagination = (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? (page - 1) * limit : 0;
        return { limit, offset };
    };

    const getPagingData = async(data, page, limit) => {

        const { count: totalItems, rows: users } = data;

        users.forEach(user => {
            if (user.image) {
              user.image = `${req.protocol}://${req.get('host')}/image/${user.image}`;


            } else {
              user.image = ''; 
            }
          });
        const currentPage = page ? page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, users, totalPages, currentPage };
    };

    const { page, size, search } = req.query;

    var condition = search ? {
        [Op.or]: [
            {
                firstName: {
                    [Op.like]: `%${req.query.search}%`
                }
            },
            {
                lastName: {
                    [Op.like]: `%${req.query.search}%`
                }
            },
            {
                email: {
                    [Op.like]: `%${req.query.search}%`
                }
            },
            {
                phone_no: {
                    [Op.like]: `%${req.query.search}%`
                }
            },
        ]
    } : {
        // id: req.user_id,
    };

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await User.findAndCountAll({
            limit,
            offset,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            where: condition,
            include: [{
                model: Role,
                required: true
            },
          ],
        });

        const response = await getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
};

module.exports.edit = async(req, res, next) => {

    var users = await User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
        },
    });

    if(users){

        return res.status(200).json({
            users: users
        });
    }else{

        return res.status(200).json({
            "message": "No record found"
        });

    }

}



