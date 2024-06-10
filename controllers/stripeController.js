const stripe = require('stripe')(process.env.STRIPE_SECRET)

const stripeController = async(req, res) => {
    const {purchase, total_amount, shipping_fee} = req.body
    
    const calculateOrderAmount = () => {
        // iterate over the list, use the ids and communicate the database and get back the correct price
        return total_amount+shipping_fee
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });
    
    console.log(paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret})
}

module.exports = stripeController