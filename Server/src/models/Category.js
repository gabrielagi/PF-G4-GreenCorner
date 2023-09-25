const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Category', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true, 
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
        
      }
    });
  };
  