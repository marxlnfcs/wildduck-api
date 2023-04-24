const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const rootDir = path.join(__dirname, '../');
const tempFile = path.join(__filename + '-generated.js');
const outputFile = path.join(rootDir, 'src/lib/api/client-schema.ts');

// generate schema
childProcess.execSync(`npx openapi-typescript https://docs.wildduck.email/api/openapi.yml --alphabetize --output ${tempFile}`);

// get content of temp file
const tempFileContent = fs.readFileSync(tempFile).toString().split('\n').filter((line, index) => index >= 5);

// replace some keywords and types to parse the file
fs.writeFileSync(
    tempFile,
    fs.readFileSync(tempFile).toString()
        .replace(/\?:/g, ':')
        .replace(/{ \[(.*): (.*)\]: (.*) }/g, 'any')
        .replace(/(.*): (.*);/g, '$1: \'$2\';')
        .replace(/;/g, ',')
        .replace(/export interface (.*) {/g, 'const $1 = {')
    +
    `module.exports = { paths, components, operations, external };`
);

// include tempFile
const tempFileInstance = require(tempFile);

// create definition
const definitionContent = [
    ...(Object.entries(tempFileInstance.components.schemas).map(([name, value]) => `export type IWildduckApi${name} = components["schemas"]["${name}"];`)),
    '',
    ...(tempFileContent.map(line => `${line.replace(/export interface (.*) {/g, 'interface $1 {')}`)),
];
fs.writeFileSync(outputFile, definitionContent.join('\n'));

fs.rmSync(tempFile)