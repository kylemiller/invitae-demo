
function Gene(name, variantAry) {
    this.name = name;
    this.variantAry = variantAry;
}

Gene.prototype.getName = function() {
    return this.name;
};

Gene.prototype.setName = function(name) {
    this.name = name;
};

Gene.prototype.getVariantAry = function() {
    return this.variantAry;
};

Gene.prototype.setVariantAry = function(variantAry) {
    this.variantAry = variantAry;
};

Gene.prototype.addVariant = function(variant) {
    if(!this.variantAry) {
        this.variantAry = [];
    }
    this.variantAry.push(variant);
};


Gene.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

Gene.prototype.toJSON = function() {
    let json = {
        name:this.name,
        variantAry:[]
    };
    this.variantAry.forEach(function(val){
        json.variantAry.push(val.toJSON());
    });
    return json;
};

module.exports = Gene;