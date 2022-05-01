


require('ts-node').register({
	project: 'tsconfig.json',
});
const meta = require('./src/_data/meta.js')

module.exports = require('./src/config/config');
