module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
    });
  
    
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
  
    User.hasOne(models.ShoppingCart, {
      foreignKey: 'userId',
      as: 'shoppingCart',
    });
  
    return User;
  };
  