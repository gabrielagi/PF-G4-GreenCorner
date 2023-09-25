const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false 
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '' //hay que modificar aca por la imagen por defecto  
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {min: 1, max: 5,},
  }
}, {timestamps: false});
};  