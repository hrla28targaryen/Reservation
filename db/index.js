const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/renttherunway', { useNewUrlParser: true })
  .then(() => console.log('connected to Mongodb'));


var reservationSchema = new mongoose.Schema({
  itemID: { type: String, required: true },
  size: { type: String, required: true },
  availableDate: [{ type: Date }],
  rentPrice: { type: Number, required: true },
  purchasePrice: { type: Number },
  productID: { type: String, required: true}
} 
// , { timestamps: { createdAt: 'created_at' } }
);

var Reservation = mongoose.model('reservations', reservationSchema);


const productSchema = new mongoose.Schema({
  productID: {type: String, Unique: true},
  itemName: {type: String},
  designerName: {type: String},
  facebook: {type: String}
});

const Product = mongoose.model('products', productSchema);


module.exports = {
  Reservation, Product
};