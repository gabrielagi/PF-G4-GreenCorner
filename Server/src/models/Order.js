const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Finish', 'Rejected'),
      allowNull: false,
    },
    shippingAddress: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressHouseNumber: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    // user ID 
  }, {
    timestamps: false, 
  });


};

  