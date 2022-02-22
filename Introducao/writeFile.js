const fs = require('fs');
const text = "Star Wars ( Brasil: Guerra nas Estrelas /Portugal: Guerra nas Estrelas e uma franquia do tipo space opera estudnidense criada pelo cineasta George Lucas.\n";

fs.writeFile('sync.txt', text, (err,data) => {
    fs.readFile('sync.txt', (err,data) => {
        console.log(data.toString());
    });
});

const promisify = require('util').promisify;

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

writeFileAsync('promise.txt')
.then(_ => readFileAsync('promise.txt'))
.then(data => console.log(data.toString()))