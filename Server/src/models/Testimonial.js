const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Testimonial",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    //   userId: {
    //   type: DataTypes.UUID, // El tipo de dato debe coincidir con el tipo de dato de 'id' en la tabla 'User'
    //   allowNull: false,
    //   references: {
    //   model: 'User',
    //   key: 'id',
    //   },
    // }
    },
    { timestamps: false }
  );
};
