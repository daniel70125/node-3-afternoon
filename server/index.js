let express = require('express');
let massive = require('massive');
let app = express();
require('dotenv').config();
let ctrl = require('../products_controller');

const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db);
    console.log('db connected')
})
.catch(err => console.log(err))

app.post('/api/products', ctrl.create);
app.get('/api/products', ctrl.getAll);
app.get('/api/products/:id', ctrl.getOne);
app.put('/api/products/:id', ctrl.update);
app.delete('/api/products/:id', ctrl.delete);

app.listen(SERVER_PORT, () => console.log(`Port: ${SERVER_PORT} running !`));






