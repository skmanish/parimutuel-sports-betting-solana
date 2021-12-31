const fs = require('fs');
const idl = require('./target/idl/choose_option.json');

fs.writeFileSync('./frontend/src/idl.json', JSON.stringify(idl));
