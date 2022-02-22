import fs from 'fs/promises'

const text = "Star Wars ( Brasil: Guerra nas Estrelas /Portugal: Guerra nas Estrelas e uma franquia do tipo space opera estudnidense criada pelo cineasta George Lucas.\n";


await fs.writeFile('async-await.txt', text);

const data = await fs.readFile('async-await.txt');
console.log(data.toString());