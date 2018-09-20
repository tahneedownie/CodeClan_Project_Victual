const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../client/public');

app.use(express.static(publicPath));
app.use(bodyParser.json());



app.listen(3000, function () {
    console.log(`App running on port ${ this.address().port }`);
  });

