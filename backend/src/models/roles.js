const Sequelize = require('sequelize');
const db = require("../../config/db.js");
const RoleSchema = {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
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

const Role = db.define('roles', RoleSchema, { paranoid: true });
module.exports = Role;