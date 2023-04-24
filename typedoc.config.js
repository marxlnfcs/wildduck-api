const glob  = require('glob');

module.exports = {
    entryPoints: glob.sync('./src/lib/**/*.ts'),
    out: './docs'
}