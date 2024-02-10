const Sequelize = require("sequelize");
const db = require("../../config/db.js");

const ProjectSchema = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  projects: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    field: "created_at",
    allowNull: true,
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: "updated_at",
    allowNull: true,
    type: Sequelize.DATE,
  },
  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: Sequelize.DATE,
  },
};

const Projects = db.define('projects', ProjectSchema,{ paranoid: true });

module.exports = Projects;
