const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBook.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
      UserBook.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  UserBook.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id',
      },
    },
    pagesRead: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    finishedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    paranoid: true,
    sequelize,
    modelName: 'UserBook',
  });
  return UserBook;
};
