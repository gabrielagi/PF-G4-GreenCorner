const { DataTypes } = requiere('sequelize');

module.exports = (sequelize) => {
    sequelize.define('OrderDetail', {
      
        OrderDetail_id: {
        type: DataTypes.UUID4,
        primaryKey: true,
      },

      oreder_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },

      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
    });
  };