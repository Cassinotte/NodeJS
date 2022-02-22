const fs = require('fs');
const text = "Star Wars ( Brasil: Guerra nas Estrelas /Portugal: Guerra nas Estrelas e uma franquia do tipo space opera estudnidense criada pelo cineasta George Lucas.\n";

fs.writeFileSync('sync.txt', text);
const data = fs.readFileSync('sync.txt');
console.log(data.toString());