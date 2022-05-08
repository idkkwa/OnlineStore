require('dotenv').config()
const { Client } = require('pg')
const bcrypt = require('bcrypt');

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'login',
}

const getAllUsers = (request, response) => {
    const client = new Client(options)
    client.connect()
    client.query('SELECT * FROM users', (err, res) => {
          response.status(200).json(res.rows);
          if(err) throw err;
        });
};

const getUserById = (request, response) => {
    const client = new Client(options)
    client.connect()
    const id = parseInt(request.params.id);
        client.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
            response.status(200).json(results.rows);
            if(err) throw err;
        });

};


// const addUser = async (request, response) => {
//     const {username, password} = request.body;
//     const admin = false;
//     const client = new Client(options)
//     client.connect()
//         client.query('INSERT INTO users (username, password, admin) VALUES ($1, $2, $3)', [username, password, admin], (error, results) => {
//           response.status(201).send(`The User has been added successfully.`);
//           if(error) throw error;
//       });      
// };


const addUser = async (request, response) => {
    //const salt = await bcrypt.genSalt(5);
    const {username, password} = request.body;
    const hash = bcrypt.hashSync(password, 10)
    const admin = false;
    const client = new Client(options)
    client.connect()
        client.query('INSERT INTO users (username, password, admin) VALUES ($1, $2, $3)', [username, hash, admin], (error, results) => {
          response.status(201).send(`The User has been added successfully.`);
          if(error) throw error;
      });
      console.log("The password is: ", bcrypt.compareSync(password, hash)); // true    
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { username, password, admin } = request.body;
    const client = new Client(options)
    client.connect()
    client.query('UPDATE users SET username = $1, password = $2, admin = $3 WHERE id = $4', [username, password, admin, id], (error, results) => {
        response.status(200).send(`The User with id ${id} has been modified.`);
        if(error) throw error;
    });
  };
  
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    const client = new Client(options)
    client.connect()
    client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        response.status(200).send(`The User with id ${id} has been deleted.`);
        if(error) throw error;
    });
  };

  // const testLogin = (request, response) => {
  //   const username = request.body.username;
  //   const password = request.body.password;

  //   const client = new Client(options)
  //   client.connect()
  //   client.query('SELECT password FROM users WHERE username = $1 AND password = $2', [username, password], (error, result) => {

  //   console.log("User Typed:", username);
  //   console.log(result);
  //     if(result.rowCount === 0){
  //       response.status(403).json({error: "Username or Password is incorrect"})

  //       // response.status(403);
  //       // response.end("Username or Password is incorrect")        
  //     }

  //     if(result.rowCount > 1){
  //       response.status(500);
  //     }

  //     if(result.rowCount == 1){
  //         response.status(200).send(`The User is logged in!`);

  //     }
  //   });
  // };

  const testLogin = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const client = new Client(options)
    client.connect()
    const hash = bcrypt.hashSync(password, 10)
    console.log( bcrypt.getRounds(hash))
    client.query('SELECT id FROM users WHERE username = $1 AND password = $2', [username, password], (error, result) => {
    console.log("User Typed:", username);
    console.log("Yo ",result.fields[0].name);

    if(result.fields[0].name == 'id'){
      console.log("it worked")
      }

      if(result.rowCount === 0){
        response.status(403).json({error: "Username or Password is incorrect"})

        // response.status(403);
        // response.end("Username or Password is incorrect")        
      }

      if(result.rowCount > 1){
        response.status(500);
      }

      if(result.rowCount == 1){
          response.status(200).send(`The User is logged in!`);

      }
    });
  };

module.exports = {
 getAllUsers,
 getUserById,
 addUser,
 updateUser,
 deleteUser,
 testLogin
}