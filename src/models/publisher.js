const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publisher.hasMany(models.Book, {
        foreignKey: 'publisherId',
        as: 'books',
      });
    }
  }
  Publisher.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Publisher',
  });
  return Publisher;
};
