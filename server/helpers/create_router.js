const express = require('express');

const createRouter = function(collection){
    const router = express.Router();

    // INDEX
    router.get('/', (req, res) => {
        collection
        .find()
        .toArray()
        .then((docs)=>{
            res.json(docs)
        })
        .catch((error) => {
            console.error(error);
        });
    })

    return router;
}


module.exports = createRouter;