import React, { Component, Fragment } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import API from "./API";
import _ from "underscore";

class ResultsTable extends React.Component {


    state = {
        variants:[]
    };

    constructor(props) {
        super(props);

        this.state = {
            variants:[]
        };

        this.api = new API();
        this.setVariants = this.setVariants.bind(this);
        this.props.eventEmitter.addListener('gene', this.setVariants);
    }


    setVariants(variants) {
        //console.log('setVariants', variants);
        let rows = _.values(variants);
        let tableRows = _.map(rows, function(row){
            //console.log(row);
            let _row = {
                id:row[0].$loki,
                gene:row[0].gene,
                nucleotideChange:row[0].nucleotideChange,
                proteinChange:row[0].nucleotideChange,
                alias:row[0].alias,
                region:row[0].region,
                reportedClassification:row[0].reportedClassification,
                lastEvaluated:row[0].lastEvaluated,
                lastUpdated:row[0].lastUpdated,
                source:row[0].source,
                url:row[0].url
            };
            if(row.length > 1) {
                //multiple nucleotideChanges
                _row.ncAry = _.without(_.unique(_.pluck(row, 'nucleotideChange')), "");
                if(_row.ncAry.length < 2) {
                    delete _row.ncAry;
                }
            }
            return _row;
        });
        //console.log(tableRows);
        this.setState({variants:tableRows});
    }



    urlFormatter(cell, row) {
        //console.log('row:', row);
        return (
            <a href={ cell } target="_blank">{row.source}</a>
        );
    }

    ncFormatter(cell, row) {
        if(row.ncAry) {
            return (<span><ul>{row.ncAry.map((nc) => <li key={nc}>{nc}</li>)}</ul></span>);
        } else {
            return (<span>{cell}</span>);
        }
    }


    render() {
        const options = {
            // pageStartIndex: 0
        };
        const columns = [{
            dataField: 'gene',
            text: 'Gene'
        }, {
            dataField: 'nucleotideChange',
            text: 'Nucleotide Change',
            formatter:this.ncFormatter
        }, {
            dataField: 'proteinChange',
            text: 'Protein Change'
        }, {
            dataField: 'alias',
            text: 'Alias'
        }, {
            dataField: 'region',
            text: 'Region'
        }, {
            dataField: 'reportedClassification',
            text: 'Reported Classification'
        }, {
            dataField: 'lastEvaluated',
            text: 'Last Evaluated'
        }, {
            dataField: 'lastUpdated',
            text: 'Last Updated'
        }, {
            dataField: 'url',
            text: 'More Info',
            formatter:this.urlFormatter
        }];


        return (
            <div>
                <BootstrapTable
                    keyField="id"
                    data={ this.state.variants }
                    columns={ columns }
                    striped
                    hover
                    condensed
                />
            </div>
        );
    }
}

export default ResultsTable;