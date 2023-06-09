/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      authorId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      publisherId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      published: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      ebookUrl: {
        type: Sequelize.STRING,
      },
      genreIds: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.UUID),
      },
      pages: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  },
};
