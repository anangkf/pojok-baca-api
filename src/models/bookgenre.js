const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookGenre.belongsTo(models.Book, { foreignKey: 'bookId' });
      BookGenre.belongsTo(models.Genre, { foreignKey: 'genreId' });
    }
  }
  BookGenre.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    bookId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    genreId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  }, {
    paranoid: true,
    sequelize,
    modelName: 'BookGenre',
  });
  return BookGenre;
};
