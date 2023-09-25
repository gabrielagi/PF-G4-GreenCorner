module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true, 
      },
      date: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status:{
        type:DataTypes.ENUM('Pending','Finish','Rejected'),
        allowNull:false,
      },
      shippingAdress:{
        type:DataTypes.STRING,
        allowNull:false
      },
      adressHouseNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
    //   paymenMethod:{

    //   },
      total:{
        type:DataTypes.DECIMAL,
        allowNull:false
      },
      //user ID
    } );
    
    

  
    return Order;
  };
  