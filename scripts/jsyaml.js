const yaml = require('js-yaml')
const fs = require('fs')

// Get document, or throw exception on error
try {
    const doc = yaml.safeLoad(fs.readFileSync('./static/teas.yaml', 'utf8'))
    fs.writeFileSync('./src/teas.json', JSON.stringify(doc, null, 2), 'utf8');
} catch (e) {
    console.log(e)
}