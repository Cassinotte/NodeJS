'use strict'
const http = require('http');
const fs = require('fs');

const fileName = String(process.argv[2] || '').replace(/[^a-z0-9\.]/gi, '');
const quantidadeOfParagraphs = String(process.argv[3] || '').replace(/[^\d]/g, '');

const USAGE = 'USO: node loreimpsum.js {nomeArquivo} {quantidadeParagrafos}';

if(!fileName, !quantidadeOfParagraphs) {
    return console.log(USAGE);
}

http.get('http://loripsum.net/api/' + quantidadeOfParagraphs, res => {
    let text = '';
    res.on('data', chuck => {
        text += chuck
    });

    res.on('end', () => {
        console.log(text);
        fs.writeFile(fileName, text, () => {
            console.log("Arquivo Pronto!");
        })
    });
})
.on('error', (e) => {
    console.log('Got error' + e.message);
});