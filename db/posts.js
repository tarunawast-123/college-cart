const Sequelize = require("sequelize");
let db;
if (process.env.DATABASE_URL) db = new Sequelize(process.env.DATABASE_URL);
else {
  db = new Sequelize({
    hosth: "localhost",
    dialect: "mysql",
    database: "mytestdb",
    username: "myuser",
    password: "mypass",
  });
}
const Posts = db.define("posts6", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: false,
  },
  body: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
});
const Following = db.define("followings6", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  naam: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: false,
  },
});
const Users = db.define("users6", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imageurl: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: true,
  },
  username: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: false,
    primarykey: true,
  },
  password: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: true,
  },
  git: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: true,
  },
  fb: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: true,
  },
  twitter: {
    type: Sequelize.DataTypes.STRING(140),
    allowNull: true,
  },
});
Users.hasMany(Following, { foreignKey: "userId" });
Following.belongsTo(Users);
Users.hasMany(Posts, { foreignKey: "userId" });
Posts.belongsTo(Users);
db.sync().then(() => {
  console.log("Database has been synced");
});
module.exports = {
  db,
  Posts,
  Users,
  Following,
};
