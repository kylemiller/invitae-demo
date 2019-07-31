const URL = '/api/1.0/variants/genes/';
const GENE_URL = '/api/1.0/variants/gene/';

class API {


    getSuggestions(input, cb) {
        return fetch(URL + input).then(res => res.json())
            .then(response => {cb(input, response)})
            .catch(error => {
                console.error('Error:', error);
                cb([])
            })
    };

    getGeneVariants(geneName) {
        return fetch(GENE_URL + geneName).then(res => res.json())
            .then(response => {return response})
            .catch(error => console.error('Error:', error));
    }
}

export default API;