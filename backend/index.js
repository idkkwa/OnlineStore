const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000','http://localhost:8080','http://localhost:4200']
}));

app.use(express.static('public'));
app.use(bodyParser());

const api = require('./src/core/products');

app.get('/api/v2/products/', api.getAllProducts);
app.get('/api/v2/products/:id', api.getProductById);
app.post('/api/v2/products/', api.addProduct);
app.put('/api/v2/products/:id', api.updateProduct);
app.delete('/api/v2/products/:id', api.deleteProduct);

const api2 = require('./src/core/users');

app.get('/api/v2/users/', api2.getAllUsers);
app.get('/api/v2/users/:id', api2.getUserById);
app.post('/api/v2/users/', api2.addUser);
app.put('/api/v2/users/:id', api2.updateUser);
app.put('/api/v2/admin/:id', api2.updateUserAdmin);
app.delete('/api/v2/users/:id', api2.deleteUser);
app.post('/api/v2/login', api2.testLogin)
app.get('/api/v2/cookie', api2.getUserCookie);
app.post('/api/v2/logout',api2.userLogout)


app.get('*', (request, response) => {
    response.json('The page has not been found')
})

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))