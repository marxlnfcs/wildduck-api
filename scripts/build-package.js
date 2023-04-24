const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '../');

// copy files to dist folder
for(let file of ['README.md', 'package.json', 'LICENSE']){
    fs.copyFileSync(file, path.join(rootDir, 'dist', file));
}

// read package.json
const packageJson = path.join(rootDir, 'dist/package.json');
const packageJsonContent = JSON.parse(fs.readFileSync(packageJson).toString());

// remove all scripts and directories
delete packageJsonContent['scripts'];
delete packageJsonContent['directories'];

// remove all devDependencies except "@types/*"
const dependencies = Object.keys(packageJsonContent.dependencies || {});
const devDependencies = Object.keys(packageJsonContent.devDependencies || {});
for(let devDependency of devDependencies){
    if(!devDependency.startsWith('@types/')) {
        delete packageJsonContent.devDependencies[devDependency];
        continue;
    }
    if(devDependency === '@types/node'){
        continue;
    }
    if(!dependencies.includes(devDependency.replace('@types/', ''))){
        delete packageJsonContent.devDependencies[devDependency];
    }
}

// save package.json
fs.writeFileSync(packageJson, JSON.stringify(packageJsonContent, null, 3));