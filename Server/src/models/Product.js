const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Product', {
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isTrending:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,  
      }
    });
};