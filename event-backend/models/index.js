const dbConfig = require("../config/dbConfig.js");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            aquire: dbConfig.pool.aquire,
            idle: dbConfig.pool.idle
        }
    }
);
sequelize.authenticate()
    .then(()=>console.log("DB connected"))
    .catch(err=>console.log(err));
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.events = require("./eventModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(()=>console.log("sync completed"))
    .catch(err=>console.log(err));

module.exports = db;