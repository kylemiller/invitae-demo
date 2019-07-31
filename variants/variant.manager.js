
let Gene = require ('./model/gene.model');
let Variant = require('./model/variant.model');
let dao = require('./dao/variants.dao');
const async = require('async');
const lineReader = require('line-reader');
const _PATH = './data/variants.tsv';
const _ = require('underscore');

let manager = {

    createVariantFromLineSync: function(line) {
        let self = this;
        let values = line.split('\t');
        let variant = new Variant(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8],
            values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16], values[17],
            values[18], values[19], values[20], values[21], values[22]);
        return variant;
    },

    initDB: function(cb) {
        var self = this;
        dao.init(function(){

            let currentGene = null;
            let geneCount = 0;
            lineReader.open(_PATH, function(err, reader){
                if(err) {
                    throw err;
                }

                async.whilst(
                    function test(callback) {
                        callback(null, reader.hasNextLine());
                    },
                    function iter(callback) {
                        reader.nextLine(function(err, line){
                            if(err) {
                                callback(err);
                            } else {
                                //console.log(line);
                                let fields = line.split('\t');
                                if(fields[0] && currentGene) {
                                    if(currentGene.getGene() !== 'Gene') {
                                        dao.save(currentGene.toJSON());
                                        geneCount++;
                                        //console.log('saved [' + geneCount + '] genes (' + currentGene.toJSON().gene + ')');
                                    }
                                    currentGene = self.createVariantFromLineSync(line);
                                } else if(fields[0]) {
                                    currentGene = self.createVariantFromLineSync(line);
                                } else {
                                    //console.log('skipping line:', line);
                                }


                                callback();
                            }
                        });
                    },
                    function(err) {
                        reader.close(function(err) {
                            if (err) throw err;
                        });
                        dao.save(currentGene);
                        geneCount++;
                        console.log('saved [' + geneCount + '] genes (' + currentGene.toJSON().gene + ')');
                        cb();
                    }
                );
            });

        });
    },

    verifyCount: function(cb) {
        let self = this;
        let count = dao.count();
        console.log('Verified count is ' + count);
        cb();
    },

    suggestGeneName: function(input, cb) {
        let self = this;

        let query = {
            'gene': {'$regex':[input, 'i']}
        };

        let results = dao.findByQuery(query) || [];
        let nameAry = _.unique(_.pluck(results, 'gene')) || [];
        cb(null, nameAry);
    },

    findVariantsByGene: function(gene, cb) {
        let self = this;
        let query = {
            'gene':gene
        };
        let results = dao.findByQuery(query);
        let groupedResults = _.groupBy(results, 'proteinChange');
        cb(null, groupedResults);
    }

};

module.exports = manager;