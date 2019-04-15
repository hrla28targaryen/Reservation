const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/renttherunway', { useNewUrlParser: true })
  .then(() => console.log('connected to Mongodb'));


var reservationSchema = new mongoose.Schema({
  itemID: { type: String, required: true },
  size: { type: String, required: true },
  bookedDate: [{ type: Date }]
}
// , { timestamps: { createdAt: 'created_at' } }
);

var Reservation = mongoose.model('reservations', reservationSchema);


const productSchema = new mongoose.Schema({
  productID: { type: String }, //HRLA001 to HRLA100
  productName: { type: String },
  designerName: { type: String },
  facebook: { type: Number },
  rentPrice: { type: Number, required: true },
  purchasePrice: { type: Number },
  items: [reservationSchema]
  // comments: [commentSchema]
});

const Product = mongoose.model('products', productSchema);

module.exports = {
  Reservation, Product
};