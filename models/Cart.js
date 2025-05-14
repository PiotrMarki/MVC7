const { getDatabase } = require("../database");
const Product = require("./Product");

class Cart {
  constructor() {}

  static COLLECTION_NAME = "carts"; 

  static async add(productName) {
    const db = getDatabase();
    const product = await Product.findByName(productName);

    if (!product) {
      throw new Error(`Product '${productName}' not found.`);
    }

    return db.collection(this.COLLECTION_NAME).updateOne(
      { "product.name": productName },
      { $inc: { quantity: 1 }, $setOnInsert: { product } },
      { upsert: true } 
    );
  }

  static getItems() {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).find().toArray(); 
  }

  static getProductsQuantity() {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]).toArray().then((result) => (result[0] ? result[0].totalQuantity : 0)); 
  }

  static getTotalPrice() {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).aggregate([
      { $project: { totalPrice: { $multiply: ["$product.price", "$quantity"] } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]).toArray().then((result) => (result[0] ? result[0].total : 0)); 
  }

  static clearCart() {
    const db = getDatabase();
    return db.collection(this.COLLECTION_NAME).deleteMany({}); 
  }
}

module.exports = Cart;
