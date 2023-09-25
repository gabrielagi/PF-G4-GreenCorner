module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Order', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true, 
      },
      date: {
        type: DataTypes.INTEGER,
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
  
    

  
    return Order;
  };
  