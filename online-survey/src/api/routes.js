
const express = require('express');  // To create the "app"
var cors = require('cors');  // For security issue
const mysql = require('mysql'); // to access the database 

const connection = mysql.createPool({
    host     : 'localhost', // Your connection adress (localhost).
    user     : 'root',     // Your database's username.
    password : 'toor',        // Your database's password.
    // not used "database" argument
  });


const app = express();

app.use(cors({
    origin: 'http://localhost:3000' // only our webapp has access to the database
  }));


// Creating a GET route to our database ! We can have multiple one ! 
app.get('/usersdb', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing SQL query
    connection.query('SHOW DATABASES', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});


// Starting our server.
app.listen(3001, () => {
 console.log('Go to http://localhost:3001/usersdb so you can see the data.');
});