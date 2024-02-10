const Sequelize = require('sequelize');
const db = require("../../config/db.js");
const CredentialsSchema = {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
    },
};

const Credentials = db.define('credentials', CredentialsSchema);

module.exports = Credentials;