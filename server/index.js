const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Reservation, Product} = require('../db/index');

const server = express();
const PORT = 3001;

const router = express.Router();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', express.static(path.join(__dirname, '../client/dist/')))

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/') // find ALL products & items =================
.get((req, res) => {
    Product.find()
      .then((data) => res.status(200).send(data))
      .catch(err => console.log('error from get ', err));
    // res.status(200).send('hello from post');
})
.post((req, res) => { // create a new product (contain many items)
    Product.create(req.body)
      .then(() => res.status(201).send('posted'))
      .catch(err => console.log('error from post ', err));
    // res.status(201).send('hello from post');
})
.delete((req, res) => { // delete All =====================================
    Product.deleteMany({__v: 0})
      .then(() => res.status(202).send('ALL deleted'))
      .catch(err => console.log('error from delete ', err));
    // res.status(202).send('hello from delete');
})

router.route('/:productID') // find one by productID
.get((req, res) => {
    let {size, productID} = req.params
    Product.findOne().where({size, productID})
      .then(data => res.status(200).send(data))
      .catch(err => console.log('error from post ', err));
})
.delete((req, res) => { // delete many by productID 
    Product.deleteMany(req.params)
      .then(() => res.status(202).send('deleted'))
      .catch(err => console.log('error from delete ', err));
    // res.status(202).send('hello from delete');
})
.put((req, res) => { // update one by productID
    Product.findOneAndUpdate(req.params, req.body)
      .then(() => res.status(203).send('updated'))
      .catch(err => console.log('error from post ', err));
    // res.status(203).send('hello from put');
})


// router.route('/:productID/:size/:availableDate') // MASTER PIECE
// .get((req, res) => {
//     req.params.availableDate = req.params.availableDate.split('&');
//     let {availableDate, size, productID} = req.params
//     Product.findOne().all('availableDate', availableDate).where({size, productID})
//       .then(data => res.status(200).send(data))
//       .catch(err => console.log('error from post ', err));
//     // res.status(203).send('hello from put');
// })

server.use('/api', router);

server.listen(PORT, ()=>console.log(`listening to port: ${PORT} , great!`));
