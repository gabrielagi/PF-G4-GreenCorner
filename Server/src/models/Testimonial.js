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
      
    },
    { timestamps: false }
  );
};
