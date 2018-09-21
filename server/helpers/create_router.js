const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {
    const router = express.Router();

    // INDEX
    router.get('/', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => {
                res.json(docs)
            })
            .catch((error) => {
                console.error(error);
            });
    })

    // SHOW
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .find({ _id: ObjectID(id) })
            .toArray()
            .then((doc) => {
                res.json(doc)
            })
            .catch((error) => {
                console.error(error)
            });
    })

    // CREATE
    router.post('/', (req, res) => {
        const newData = req.body;
        collection
            .insertOne(newData)
            .then(() =>
                collection
                    .find()
                    .toArray())
            .then((docs) =>
                res.json(docs));
    })
        .catch((error) => {
            console.error(error)
        });

    // UPDATE
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const updatingItem = req.body;
        collection.updateOne(
            { _id: ObjectID(id) },
            { $set: updatingItem }
        )
            .then(() => {
                collection
                    .find()
                    .toArray()
                    .then((docs) => {
                        res.json(docs)
                    })
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // DELETE

    return router;
}


module.exports = createRouter;