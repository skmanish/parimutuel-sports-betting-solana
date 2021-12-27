const fs = require('fs');
const idl = require('./target/idl/choose-option.json');

fs.writeFileSync('./app/src/idl.json', JSON.stringify(idl));