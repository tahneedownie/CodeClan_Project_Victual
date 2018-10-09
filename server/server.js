const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../client/public');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const mongoURI = process.env.MONGOLAB_URI;

app.use(express.static(publicPath));
app.use(bodyParser.json());

MongoClient.connect(mongoURI)
  .then((client)=>{
    const db = client.db('victual')
    const userFoodItemcollection = db.collection('user_food_items')
    const foodDatabaseRouter = createRouter(userFoodItemcollection)
    app.use('/api/user_food_items', foodDatabaseRouter);
  })
  .catch(console.error);

app.listen(process.env.PORT || 3000, function () {
  console.log(`App running on port ${this.address().port}`);
});
