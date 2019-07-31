# invitae-demo
Demo for GENE variant API and Table

**Run at http://invitae-demo.kyle-miller.com/**

*Cloned from https://github.com/invitae/variant-search-coding-assignment*


## Technologies
This demo is built with NodeJS and React.  It utilizes an in-memory NoSQL DB and is deployed to Heroku.

## Instructions
To run this locally, install NodeJS and NPM and then run the following:

```
npm install
npm run-script build
npm start
```

The application can then be accessed at http://localhost:3000

To execute the unit tests, run the following:

```
npm test
```

## Design Notes
The backend of this application utilizes an "N-tier" design.  The RESTful API is exposed as an interface to the application and the top-most layer.  Functionality is then grouped into modules (of which there is one: variants).  The variant.manager class exists to encompass any "business" logic necessary for its function and is the middle tier of this application.  The data access layer is implemented in the variants.dao.js and it exists to manage the storage and retrieval of data from the database.

The frontend of this application is built with 2 sibling components in ReactJS.  Communication between these components uses a publish/subscribe paradigm that is implemented with EventEmitter.  The AutoComplete component is based heavily on code from https://alligator.io/react/react-autocomplete/.   The ResultsTable component is built using react-bootstrap-table2 from https://react-bootstrap-table.github.io/react-bootstrap-table2/.

