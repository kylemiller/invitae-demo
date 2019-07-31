
const express= require('express');

const app = express();
const manager = require('../../variants/variant.manager');

app.get('/genes/:input', (req, resp) => {
    manager.suggestGeneName(req.params.input, function(err, list){
        resp.send(list);
    });
});

app.get('/gene/:name', (req, resp) => {
    manager.findVariantsByGene(req.params.name, function(err, list){
        resp.send(list);
    });
});

module.exports = app;