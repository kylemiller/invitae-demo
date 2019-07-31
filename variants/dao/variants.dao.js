const loki = require('lokijs');
const VARIANTS = 'variants';
let _DB = null;
let dao = {


    init: function(fn) {
        if(!_DB) {
            _DB = new loki('loki-db.json');
            let variants = _DB.addCollection(VARIANTS);
            console.log('initialized DB');
            fn();
        } else {
            fn();
        }


    },

    save: function(json) {
        let col = _DB.getCollection(VARIANTS);
        return col.insert(json);
    },

    count: function() {
        let col = _DB.getCollection(VARIANTS);
        return col.count();
    },

    findByQuery: function(query) {
        let col = _DB.getCollection(VARIANTS);
        return col.find(query);
    }
};


module.exports = dao;