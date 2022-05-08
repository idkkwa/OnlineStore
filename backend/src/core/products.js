require('dotenv').config()
const { Client } = require('pg')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'radioshack',
}

const getAllProducts = (request, response) => {
    const client = new Client(options)
    client.connect()
    client.query('SELECT * FROM store', (err, res) => {
          response.status(200).json(res.rows);
          if(err) throw err;
        });
};

const getProductById = (request, response) => {
    const client = new Client(options)
    client.connect()
    const id = parseInt(request.params.id);
        client.query('SELECT * FROM store WHERE id = $1', [id], (err, results) => {
            response.status(200).json(results.rows);
            if(err) throw err;
        });
};

const addProduct = async (request, response) => {
    const {productname, brandname, price, color, productdescription} = request.body;
    const client = new Client(options)
    client.connect()
        client.query('INSERT INTO store (productname, brandname, price, color, productdescription) VALUES ($1, $2, $3, $4, $5)', [productname, brandname, price, color, productdescription], (error) => {
            response.status(201).send(`${productname} has been added successfully.`);
            if(error) throw error;
        });
};


const updateProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const { productname, brandname, price, color, productdescription} = request.body;
    const client = new Client(options)
    client.connect()
    client.query('UPDATE store SET productname = $1, brandname = $2, price = $3, color = $4, productdescription = $5 WHERE id = $6', 
    [productname, brandname, price, color, productdescription, id], (error, results) => {
        response.status(200).send(`The product with id ${id} has been modified.`);
        if(error) throw error;
    });
  };
  
  const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const client = new Client(options)
    client.connect()
    client.query('DELETE FROM store WHERE id = $1', [id], (error, results) => {
        response.status(200).send(`The User with id ${id} has been deleted.`);
        if(error) throw error;
    });
  };

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}