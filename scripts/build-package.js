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
const peerDependencies = Object.keys(packageJsonContent.peerDependencies || {});

// remove all devDependencies that are not starting with @types/*
if(packageJsonContent.devDependencies){
    Object.keys(packageJsonContent.devDependencies).map(p => {
        if(!p.startsWith('@types/')){
            delete packageJsonContent.devDependencies[p];
            return;
        }
        if(
            !dependencies.includes(p.replace('@types/', '')) &&
            !peerDependencies.includes(p.replace('@types/', ''))
        ){
            delete packageJsonContent.devDependencies[p];
        }
    });
}

// move all dependencies to peerDependencies
if(packageJsonContent['dependencies']){
    packageJsonContent['peerDependencies'] = packageJsonContent['peerDependencies'] || {};
    Object.keys(packageJsonContent['dependencies']).map(p => {
        if(!Object.keys(packageJsonContent['peerDependencies']).includes(p)){
            packageJsonContent['peerDependencies'][p] = packageJsonContent['dependencies'][p];
        }
    });
}

// remove all unwanted properties
delete packageJsonContent['scripts'];
delete packageJsonContent['directories'];
delete packageJsonContent['dependencies'];

// save package.json
fs.writeFileSync(packageJson, JSON.stringify(packageJsonContent, null, 3));