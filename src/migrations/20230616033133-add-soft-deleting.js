/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Admins', 'deletedAt', { type: Sequelize.DATE });

    await queryInterface.addColumn('Authors', 'deletedAt', { type: Sequelize.DATE });

    await queryInterface.addColumn('Books', 'deletedAt', { type: Sequelize.DATE });

    await queryInterface.addColumn('Genres', 'deletedAt', { type: Sequelize.DATE });

    await queryInterface.addColumn('Publishers', 'deletedAt', { type: Sequelize.DATE });

    await queryInterface.addColumn('Users', 'deletedAt', { type: Sequelize.DATE });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
