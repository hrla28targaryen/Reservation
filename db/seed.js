const mongoose = require('mongoose');
const { Reservation, Product } = require('./index.js');


var sizePool = [
  {
    US: 0,
    FR: 34,
    SML: 'XXS'
  }, {
    US: 2,
    FR: 36,
    SML: 'XS'
  }, {
    US: 4,
    FR: 38,
    SML: 'XS'
  }, {
    US: 6,
    FR: 40,
    SML: 'M'
  }, {
    US: 8,
    FR: 42,
    SML: 'M'
  }, {
    US: 10,
    FR: 44,
    SML: 'L'
  }, {
    US: 12,
    SML: 'XL'
  }, {
    US: 14,
    SML: 'XL'
  },
];

var lengthPool = [
  'Petite', 'Regular', 'Long', 'Extra long'
]

var seedData = [];
var k = 1; //for itemID

const designerPool = [
  'Alexander McQueen', 'Betsey Johnson', 'Emilio Pucci', 'Miuccia Prada', 'Riccardo Tisci', 'Le Corbusier', 'Coco Chanel'
]

const itemNamePool = [
  'Chill', 'Lit', 'n', 'Mara', 'Delicate', '1004', 'Payton', 'Chiffon', 'Cropped', 'Column', 'Wrap', 'Isabella', 'Lia',
  'Metallic', 'Deconstructed', 'Hetty', 'Track', 'Nell', 'Ella', 'Tank', 'Tie', 'Wild', 'WildFlower', 'Tiger', 'Ellii',
  'Sha', 'Ira', 'Miya', 'dark', 'light'
];

const cataPool = [
  'Dress', 'Bag', 'Earrings', 'Top', 'Pants'
];

for (let i = 1; i <= 100; i++) {
  let productID = 'HRLA';
  if (i.toString().length === 1) {
      productID += '00' + i.toString();
  } else if (i.toString().length === 2) {
      productID += '0' + i.toString();
  } else if (i.toString().length === 3) {
      productID += i.toString();
  }
  var productName = `${itemNamePool[Math.floor(Math.random() * itemNamePool.length)]} ${cataPool[Math.floor(Math.random() * cataPool.length)]}`;
  var designerName = `${designerPool[Math.floor(Math.random() * designerPool.length)]}`;
  var facebook = Math.floor(Math.random() * 1000);
  var items = [];

  var _itemNumber = 5 + Math.floor(Math.random() * 6);
  var _whetherL = Math.ceil(Math.random() * 10);
  var _sizeFormat = Math.floor(Math.random() * 3);

  var rentPrice = 80 + 10 * Math.round(Math.random() * 5);
  var purchasePrice = rentPrice * 5;

  for (let j = 1; j <= _itemNumber; j++) { // generate n items per product
    var randS = (j - 1) % 8;
    var randL = Math.floor(Math.random() * 4);

    if (_sizeFormat === 0) {
      var size = sizePool[randS].US;
    } else if (_sizeFormat === 1) {
      var size = `US ${sizePool[randS].US} ${sizePool[randS].FR ? `/ FR ${sizePool[randS].FR}` : ''}`;
    } else {
      var size = `${sizePool[randS].SML}`;
    }

    if (_whetherL > 8) {
      size = size + `, ${lengthPool[randL]}`
    }

    var itemID = 'A';
    if (i.toString().length === 1) {
      itemID += '0000' + k.toString();
    } else if (k.toString().length === 2) {
      itemID += '000' + k.toString();
    } else if (k.toString().length === 3) {
      itemID += '00' + k.toString();
    } else if (k.toString().length === 4) {
      itemID += '0' + k.toString();
    } else if (k.toString().length === 5) {
      itemID += k.toString();
    }

    k++;

    var availableDate = [];
    var tomorrow = new Date('2019-3-29');
    availableDate.push(tomorrow);
    var later = new Date('2019-7-28');
    availableDate.push(later);
    // diff between later & tomorrow is 10454400000
    // console.log(new Intl.DateTimeFormat().format(tomorrow.setDate(tomorrow.getDate() + 1)))

    items.push({ itemID, size, availableDate });


  }

  let prod = new Product({
    productID: productID, //through for loop
    productName: productName, //random generator
    designerName: designerName, //random gen
    facebook: facebook, // random gen
    rentPrice: rentPrice,
    purchasePrice: purchasePrice,
    items: items
  });
  prod.save()
    .then(() => {
      Product.findOne({ productID: productID }) // just to see if the prod above is saved
        .then(productWithComments => console.log(productWithComments.items.length))
    })
    .catch(err => console.log(err));
  // seedData.push(productID, productName, designerName, facebook, items);
};

// const seedFunction = () => {
//   Product.create(seedData)
//     .then(() => {
//       console.log('seed planted to product db');
//       mongoose.connection.close();
//     })
//     .catch(err => console.error(err))
// }

// seedFunction();