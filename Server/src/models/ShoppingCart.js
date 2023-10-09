const { DataTypes } = require('sequelize');
const Product = require('./Product');
//tabla que en un futuro podamos llegar a usar//importar el modelo en db.js si se requiere de su uso//
module.exports = (sequelize) => {
  sequelize.define('ShoppingCart', {
     
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
    },
    }, {
        timestamps: false, 
      });
};
