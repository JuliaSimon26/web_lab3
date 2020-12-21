import http from 'http';
import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let object = {};

app.get('/', (req, res) => {
    if (Object.keys(object).length !== 0) {
        res.status(200).json(object);
    } else {
        res.status(200).json({ object: null });
    }
})

app.post('/', (req, res) => {
    if (Object.keys(object).length === 0) {
        object = JSON.parse(JSON.stringify(req.body));
        res.status(200).json({ status: 'created' });
    } else {
        res.status(400).json({ status: 'object exists' });
    }
})


app.put('/', (req, res) => {
    if (Object.keys(object).length !== 0) {
        object = req.body;
        res.status(200).json({ status: "re-created" });
    } else {
        res.status(400).json({ status: 'object not exists' });
    }
})

app.patch('/', (req, res) => {
    if (Object.keys(object).length !== 0) {
        object = Object.assign(object, req.body);
        res.status(200).json({ status: "updated" });
    } else {
        res.status(400).json({ status: 'object not exists' });
    }
})
server.listen(4000, () => {
    console.log("app is listening to port 4000");
})