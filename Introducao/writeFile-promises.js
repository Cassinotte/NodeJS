const fs = require('fs/promises');

const text = "Star Wars ( Brasil: Guerra nas Estrelas /Portugal: Guerra nas Estrelas e uma franquia do tipo space opera estudnidense criada pelo cineasta George Lucas.\n";


fs.writeFile('promisse.txt', text)
.then(_ => fs.readFile('promisse.txt'))
.then(data => console.log(data.toString()));