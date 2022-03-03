const express = require('express')
const router = express.Router()

const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: "TEST-1445686714358282-071223-ab0cbfc70e1c217dc48bbaa5e50048b0-276101439",
  });

  router.post("/", function (req, res) {
    const preference = {
      items: [
        {
          title : "Suscripcion",
          unit_price : 500,
          quantity : 1,
          currency_id : "UY"
        }
        ],
        back_urls: {
          "success": "http://localhost:4000/conthxxxenido",
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