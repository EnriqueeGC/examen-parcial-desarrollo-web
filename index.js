
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

let router = require('./app/routes/customer.routes.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api', router);
app.get("/",(req,res) => {
  
  res.json({mesage:"Bienvenido Estudiantes de UMG"});
})

// Create a Server
const server = app.listen(8081, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})