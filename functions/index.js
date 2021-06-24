const functions = require('firebase-functions');
const STRIPE_SECRET_KEY =
  'sk_test_51HSImQI7LuvereHGDniTLsf7ycjrpwYg43eQpjCOAIzr45f4wBhY5suoxN6A6rSLWihKnOKs5fMlV5ItslF9O62T0052vj50DZ';
const stripe = require('stripe')(STRIPE_SECRET_KEY);

exports.payWithStripe = functions.https.onRequest((request, response) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys

  stripe.charges
    .create({
      amount: request.body.amount,
      currency: request.body.currency,
      source: request.body.token,
      description: request.body.description,
    })
    .then((charge) => {
      response.send({response: charge, error: null});
    })
    .catch((err) => {
      response.send({error: err});
    });
});
