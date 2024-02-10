module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      role_id:{
        type: Sequelize.BIGINT,
        defaultValues : 0
      },
      name:{
        type: Sequelize.STRING,
      },
      email: {
          type: Sequelize.STRING,
      },
      password: {
          type: Sequelize.STRING
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('admins');
  }
};
