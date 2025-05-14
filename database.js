const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

const mongoConnect = (callback) => {
  const uri = "mongodb+srv://MVC7:haslo123@cluster0.zme8lc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect()
    .then(() => {
      console.log("Connection to the database has been established.");
      database = client.db("shop"); 
      callback(); 
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
      throw err;
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("No database found."); 
  }
  return database; 
};

module.exports = { mongoConnect, getDatabase };