const stripe = require('stripe')('sk_test_ZeOM9nOn5ASeToBPxUfwb1qT')
const router = require('express').Router()

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}
router.get('/', (req, res, next) => {
  try {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    console.log('STRIPE purhcase succeeded', req.body)
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    }
    stripe.charges.create(body, stripeChargeCallback(res))
  } catch (err) {
    next(err)
  }
})

module.exports = router
