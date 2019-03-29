const mongoose = require('mongoose');
const { Reservation } = require('./index.js');


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
var k = 1;

for (let i = 1; i <= 100; i++) {
  var productID = 'HRLA' + String(i).padStart(3, 0);
  var itemNumber = 10 + Math.floor(Math.random() * 6);
  var whetherL = Math.ceil(Math.random() * 10);
  var sSelector = Math.floor(Math.random() * 3);
  var rentPrice = 80 + 10 * Math.round(Math.random() * 5);
  var purchasePrice = rentPrice * 5;

  for (let j = 1; j <= itemNumber; j++) {
    var randS = Math.floor(Math.random() * 8);
    var randL = Math.floor(Math.random() * 4);

    if (sSelector === 0) {
      var size = sizePool[randS].US;
    } else if (sSelector === 1) {
      var size = `US ${sizePool[randS].US} ${sizePool[randS].FR ? `/ FR ${sizePool[randS].FR}` : ''}`;
    } else {
      var size = `${sizePool[randS].SML}`;
    }

    if (whetherL > 8) {
      size = size + `, ${lengthPool[randL]}`
    }

    var itemID = 'A' + String(k).padStart(5, 0); k++;

    var availableDate = [];
    var tomorrow = new Date('2019-3-29');
    availableDate.push(tomorrow);
    var later = new Date('2019-7-28');
    availableDate.push(later);
    // diff between later & tomorrow is 10454400000
    // console.log(new Intl.DateTimeFormat().format(tomorrow.setDate(tomorrow.getDate() + 1)))

    var newItem = { itemID, productID, size, rentPrice, purchasePrice, availableDate };
    seedData.push(newItem);
  }
};

const seedFunction = () => {
  Reservation.create(seedData)
    .then(() => {
      console.log('seed planted to reservation db');
      mongoose.connection.close();
    })
    .catch(err => console.error(err))
}

seedFunction();