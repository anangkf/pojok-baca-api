const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Author, { foreignKey: 'authorId', as: 'author' });
      Book.belongsTo(models.Publisher, { foreignKey: 'publisherId', as: 'publisher' });
      Book.belongsToMany(models.Genre, { through: 'BookGenres', foreignKey: 'bookId', as: 'genres' });
    }
  }
  Book.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    authorId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    publisherId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    published: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    thumbnail: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ebookUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    // genreIds: {
    //   allowNull: false,
    //   type: DataTypes.ARRAY(DataTypes.UUID),
    // },
    pages: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
