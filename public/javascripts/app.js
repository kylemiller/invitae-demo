import React from "react";
import { render } from "react-dom";

import Autocomplete from "./autocomplete";
import ResultsTable from "./resultsTable";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
const EventEmitter = require('wolfy87-eventemitter');

function App() {
    let ee = new EventEmitter();

    return (
        <div>
            <h1>Gene Variant Search Demo</h1>
            <Autocomplete suggestions={[]} eventEmitter={ee} />
            <ResultsTable eventEmitter={ee}/>
        </div>
    );
}

render(<App />, document.getElementById('root'));