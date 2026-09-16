import { response } from "express";

export default (express, bodyParser, createReadStream, crypto, http) => {
    const app = express();

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
        res.setHeader('Access-Control-Allow-Headers',
            'Content-Type, Accept, ngrok-skip-browser-warning, Authorization');
        next();
    });

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/login/', (req, res) => {
        res.send('orangecells_1')
    });

    app.get('/code/', (req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        const filePath = import.meta.url.substring(7);
        createReadStream(filePath).pipe(res);
    });

    app.get('/sha1/:input/', (req, res) => {
        res.send(crypto.createHash('sha1').update(req.params.input).digest('hex'));
    });

    app.get('/req/', (req, res) => {
        http.get(req.query.addr, (response) => response.pipe(res)).on('error', () => res.sendStatus(500));
    });
    app.post('/req/', (req, res) => {
        http.get(req.body.addr, (response) => response.pipe(res)).on('error', () => res.sendStatus(500));
    });

    app.all('*', (req, res) => {
        res.send('orangecells_1');
    });

    return app;
}