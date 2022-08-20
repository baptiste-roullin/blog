require('ts-node').register({
	project: 'tsconfig.json',
});
module.exports = require('./src/config/config');
