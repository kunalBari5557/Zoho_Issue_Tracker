'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('issues', {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Add the following lines to explicitly set timestamps
    await queryInterface.sequelize.query('ALTER TABLE `issues` MODIFY COLUMN `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP');
    await queryInterface.sequelize.query('ALTER TABLE `issues` MODIFY COLUMN `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('issues');
  }
};
