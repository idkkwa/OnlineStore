require('dotenv').config()
const { Client } = require('pg')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { router } = require('express').Router()

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

  const testLogin = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const client = new Client(options)
    client.connect()
      client.query('SELECT * FROM users WHERE username = $1', [username], (error, r) => {
        // console.log("Database:", r.rows);

        //     console.log("User Input:", password)
        //     console.log("Database:", r.rows[0].password);
            
            if(r.rowCount === 0){
              response.status(403).json({error: "Username or Password is incorrect"})     
            }
      
            if(r.rowCount > 1){
              response.status(500);
            }
      
            if(r.rowCount == 1){   

                bcrypt.compare(password, r.rows[0].password).then(function(result) {     
                  //console.log("Answer is ", result)

                  if(!result){
                  response.status(403).send({message: "Password is incorrect"})           
                }

                //   if(result){
                //     response.status(200).send(`The User is logged in!`);
                // } 

              });
            }
  
        const token = jwt.sign(r.rows[0].id, "secret")

        response.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        })
        
        response.send({
          message: "success"
        })        
    });
  };

  const getUserCookie = (request, response) => {
    try {
      const cookie = request.cookies['jwt']

      const claims = jwt.verify(cookie, 'secret')

      if (!claims) {
          return response.status(401).send({
              message: 'unauthenticated'
          })
      }

      const client = new Client(options)
      client.connect()
        client.query('SELECT * FROM users WHERE id = $1', [claims], (error, r) => {
          console.log(r.rows)
          response.send(r.rows[0].username)
        })

    } catch (e) {
        return response.status(401).send({
            message: 'unauthenticated'
        })
    }
  }

  const userLogout = (request, response) => {
    response.cookie('jwt', '', {maxAge: 0})

    response.send({
      message: 'success'
    })
  }

module.exports = {
 getAllUsers,
 getUserById,
 addUser,
 updateUser,
 deleteUser,
 testLogin,
 userLogout,
 getUserCookie
}