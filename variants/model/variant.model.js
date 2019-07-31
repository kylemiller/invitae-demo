
function Variant(gene, nc, pc, om, alias, transcripts, region, rc, ic, source, lastEvaluated, lastUpdated, url, submitterComment,
                 assembly, chr, genomicStart, genomicStop, ref, alt, accession, reportedRef, reportedAlt) {
    this.gene = gene;
    this.nucleotideChange = nc;
    this.proteinChange = pc;
    this.otherMappings = om;
    this.alias = alias;
    this.transcripts = transcripts;
    this.region = region;
    this.reportedClassification = rc;
    this.inferredClassification = ic;
    this.source = source;
    this.lastEvaluated = lastEvaluated;
    this.lastUpdated = lastUpdated;
    this.url = url;
    this.submitterComment = submitterComment;
    this.assembly = assembly;
    this.chr = chr;
    this.genomicStart = genomicStart;
    this.genomicStop = genomicStop;
    this.ref = ref;
    this.alt = alt;
    this.accession = accession;
    this.reportedRef = reportedRef;
    this.reportedAlt = reportedAlt;
}

Variant.prototype.toJSON = function() {
    var json = {
        gene: this.gene,
        nucleotideChange:this.nucleotideChange,
        proteinChange:this.proteinChange,
        otherMappings:this.otherMappings,
        alias:this.alias,
        transcripts:this.transcripts,
        region:this.region,
        reportedClassification:this.reportedClassification,
        inferredClassification:this.inferredClassification,
        source:this.source,
        lastEvaluated:this.lastEvaluated,
        lastUpdated:this.lastUpdated,
        url:this.url,
        submitterComment:this.submitterComment,
        assembly:this.assembly,
        chr:this.chr,
        genomicStart:this.genomicStart,
        genomicStop:this.genomicStop,
        ref:this.ref,
        alt:this.alt,
        accession:this.accession,
        reportedRef:this.reportedRef,
        reportedAlt:this.reportedAlt
    };
    return json;
};

Variant.prototype.fromJSON = function(json) {
    this.gene = json.gene;
    this.nucleotideChange = json.nucleotideChange;
    this.proteinChange = json.proteinChange;
    this.otherMappings = json.otherMappings;
    this.alias = json.alias;
    this.transcripts = json.transcripts;
    this.region = json.region;
    this.reportedClassification = json.reportedClassification;
    this.inferredClassification = json.inferredClassification;
    this.source = json.source;
    this.lastEvaluated = json.lastEvaluated;
    this.lastUpdated = json.lastUpdated;
    this.url = json.url;
    this.submitterComment = json.submitterComment;
    this.assembly = json.assembly;
    this.chr = json.chr;
    this.genomicStart = json.genomicStart;
    this.genomicStop = json.genomicStop;
    this.ref = json.ref;
    this.alt = json.alt;
    this.accession = json.accession;
    this.reportedRef = json.reportedRef;
    this.reportedAlt = json.reportedAlt;
};

Variant.prototype.getGene = function() {
    return this.gene;
}

module.exports = Variant;