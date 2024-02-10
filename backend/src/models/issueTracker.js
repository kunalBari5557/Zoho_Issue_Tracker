const Sequelize = require("sequelize");
const db = require("../../config/db.js");
const Project = require('./projects.js')

const IssueSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  project_id: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  status_id: {
    type: Sequelize.BIGINT, 
    allowNull: false,
  },
  issues: {
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

const Issue = db.define('issues', IssueSchema, { 
  timestamps: true,
  paranoid: true,
});

Project.hasMany(Issue, { foreignKey: 'id' });
Issue.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = Issue;
