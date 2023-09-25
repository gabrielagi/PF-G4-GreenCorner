const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      related_products: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Meto todos los integers(opcional) de los productos en un array 
        defaultValue: [],      
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      
    });
};