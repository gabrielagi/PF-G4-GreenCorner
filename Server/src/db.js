require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, native: false, });
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);



const { User, Order, Product, Category, OrderDetail, ShoppingCart, Favorite} = sequelize.models;

// RELACIONES
//User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
//Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//Order.belongsToMany(Product, { through: OrderDetail, foreignKey: 'orderId', as: 'products' });
//Product.belongsToMany(Order, { through: OrderDetail, foreignKey: 'productId', as: 'orders' });

Product.belongsToMany(Category, { through: "ProductCategory", foreignKey: 'productId', as: 'categories' });
Category.belongsToMany(Product, { through: "ProductCategory", foreignKey: 'categoryId', as: 'products' });

/* User.hasOne(Testimonial ) */
ShoppingCart.belongsTo(Product, {
  foreignKey: 'product_id' // Clave foránea en el modelo Product
});
ShoppingCart.belongsTo(User, {
  foreignKey: 'email',
  targetKey: 'email',
});

Favorite.belongsTo(Product, {
  foreignKey: 'product_id' // Clave foránea en el modelo Product
});
Favorite.belongsTo(User, {
  foreignKey: 'email',
  targetKey: 'email',
});

Order.belongsTo(User, {
  foreignKey: 'email',
  targetKey: 'email',
});

OrderDetail.belongsTo(Order, {
  foreignKey: 'order_id',
});

OrderDetail.belongsTo(Product, {
  foreignKey: 'product_id',
  targetKey: 'product_id'
});


/*
Product.hasMany(ShoppingCart);
ShoppingCart.hasMany(Product);*/


//Descomentar si se importo el modelo ShoppingCart
//User.hasMany(ShoppingCart, { foreignKey: 'userId', as: 'ShoppingCart' });
//ShoppingCart.belongsTo(User, { foreignKey: 'userId', as: 'user' });


module.exports = {
  ...sequelize.models, 
  conn: sequelize,   
};
