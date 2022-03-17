const { Sequelize } = require("sequelize")


const sequelize = new Sequelize({
    database: "d2vjj846fs11cf",
    username: "kellhhcylwzpjz",
    password: "2bd3b1f54339dd64303f137257044a9bb0b1b93a7c8274e0ac3f33042f1f18ba",
    host: "ec2-54-88-75-69.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });

module.exports = {
    sequelize
} 