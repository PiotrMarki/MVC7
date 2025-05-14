const { getDatabase } = require("../database");

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static COLLECTION_NAME = "products"; 

  static getAll() {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).find().toArray(); 
  }

  static add(product) {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).insertOne(product); 
  }

  static findByName(name) {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).findOne({ name }); 
  }

  static deleteByName(name) {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).deleteOne({ name }); 
  }

  static getLast() {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).find().sort({ _id: -1 }).limit(1).toArray(); 
  }
}

module.exports = Product;
