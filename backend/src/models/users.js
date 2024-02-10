const Sequelize = require('sequelize');
const db = require("../../config/db.js");
const Role = require('./roles.js')
const UserSchema = {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: Sequelize.BIGINT,
        defaultValues: 0
    },
    role_id: {
        type: Sequelize.BIGINT,
        defaultValues: 0
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    phone_no: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },
    createdAt: {
        field: 'created_at',
        allowNull: true,
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        allowNull: true,
        type: Sequelize.DATE
    },
    deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DATE
    },
};

const User = db.define('users', UserSchema,{ paranoid: true });

Role.hasMany(User, { foreignKey: 'id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;