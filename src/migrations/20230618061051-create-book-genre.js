/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookGenres', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      bookId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      genreId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Genres',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
    // fix Users table relationships
    await queryInterface.changeColumn('Books', 'authorId', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Authors',
        key: 'id',
      },
    });
    await queryInterface.changeColumn('Books', 'publisherId', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Publishers',
        key: 'id',
      },
    });
    await queryInterface.removeColumn('Books', 'genreIds');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookGenres');
  },
};
