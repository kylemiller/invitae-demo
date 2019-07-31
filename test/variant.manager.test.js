let manager = require('../variants/variant.manager');
const assert = require('assert');
const _ = require('underscore');

describe('variant.manager', function(){
    before(function(done){
        manager.initDB(done);
    });
    describe('suggestGeneName', function(){
        it('respond with array of gene names matching the input', function(done){
            manager.suggestGeneName('BRA', function(err, list){
                if(err) {
                    done(err);
                } else {
                    //console.log(list);
                    assert(list.length > 0);
                    done();
                }
            });
        });

        it('respond with empty array', function(done){
            manager.suggestGeneName('XXXX', function(err, list){
                if(err) {
                    done(err);
                } else {
                    //console.log(list);
                    assert(list.length === 0, 'list length should be 0');
                    done();
                }
            });
        });


    });
    describe('findVariantsByGene', function(){
        it('respond with array of gene variants matching the input', function(done){
            manager.findVariantsByGene('BRAF', function(err, list){
                if(err) {
                    done(err);
                } else {
                    //console.log(list);
                    assert(_.keys(list).length > 0);
                    done();
                }
            });
        });

        it('respond with empty array when no genes match input', function(done){
            manager.findVariantsByGene('XXXX', function(err, list){
                if(err) {
                    done(err);
                } else {
                    assert(_.keys(list).length === 0, 'list length should be 0');
                    done();
                }
            });
        });
    });
});