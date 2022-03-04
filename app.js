const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const moment = require('moment')
const Users = require('./model/user')
const { Op } = require('sequelize');

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
});
app.post('/api/status', function (req, res, next) {
});

module.exports = app;
const { sequelize } = require("./db")
require('dotenv').config()

// Funcion para borrar usuario a los 30 dias
deleteOldUsers = () => {
  let current = moment().subtract(30, 'days').format('YYYY-MM-DD')
  current = moment.utc(current).format()
  Users.findAll({ cretatedAt: { [Op.gt]: new Date("2022-02-23") }}), (err) => {
         if (err) {
             console.log(err)
         }
       }
}
deleteOldUsers()

const { router: suscribeRouter } = require('./routes/suscribe')
const { router: loginRouter } = require('./routes/login')
const { router: pagoRouter } = require('./routes/pagoMp')
const { router: upRouter } = require('./routes/up')

app.use(express.static(path.join(__dirname, "public")))
 
app.get("/", function (req, res) {
  res.sendFile(path.join
    (__dirname, "public", "index.html"))
})
app.get("/conthxxxenido", function (req, res) {
  res.sendFile(path.join
    (__dirname, "public", "contenido.html"))
})
app.get("/archivos", authenticate, function(req, res){
  res.sendFile(path.join
    (__dirname, "public", "archivos.html"))
})

//  Middleware de autenticacion de usuarios
function authenticate (req, res, next) {
  const access_token = req.cookies.token
  if (!access_token) {return  res.send("no tine acceso");
  }
  jwt.verify(access_token, process.env.SECRET, (err, user) => {
    if(err){
      res.send("no tine acceso");
    }else{
      next();
    }
    })
  }

app.use('/suscribe', suscribeRouter)
app.use('/login', loginRouter)
app.use('/pago', pagoRouter)
app.use('/up', upRouter)

const PORT = 4000;

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((error) => {
    console.log('Error connecting Sequelize:', error);
  });

app.listen(PORT, async () => {
  console.log(`Server listening at port ${PORT}`);
  try {
    await sequelize.authenticate();
    
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});