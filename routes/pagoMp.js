const express = require('express')
const router = express.Router()

const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: "APP_USR-5184633192879009-030520-2564f960c24a0bdad970844be3e938f6-340312644",
  });

  router.post("/", function (req, res) {
    const preference = {
      items: [
        {
          title : "Suscripcion",
          unit_price : 1000,
          quantity : 1,
          currency_id : "UY"
        }
        ],
        back_urls: {
          "success": "http://localhost:4000/conthxxxenido00",
          "failure": "http://localhost:4000/",
        },
        auto_return: "approved",
        binary_mode: true,
    }
    mercadopago.preferences.create(preference) 
    .then( function(response) {
        res.redirect(response.body.init_point);  
    })
    .catch(function(error) {
      console.log(error);
    });
  
  }) 

    module.exports = {
        router: router
        }