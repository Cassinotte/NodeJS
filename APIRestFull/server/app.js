import express from "express";
import cors from 'cors'

import Home from '../controller/Home.js'
import AppController from "../controller/App.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", Home.index)
app.use(routes);

app.use(cors());

/*app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept');
    next();
});*/

//app.use(routes);

/*app.use((request, response, next) => {
    if(request.url === '/favicon.ico') {
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end('');
    } else {
        next();
    }
});*/

app.use(AppController.notFound);
app.use(AppController.handleError);

/*app.use((request, response, next) => {
    var err = new Error('Not found')
    err.status = 404;
    next(err);
});

app.use((err, request, response, next) => {
    if(err.status !== 404) console.log(err.stack);
    response.status(err.status || 500).json({ err: err.message});
})*/

export default app;