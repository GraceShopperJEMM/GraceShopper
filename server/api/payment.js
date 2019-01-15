const dotenv = require('dotenv')
const cors = require('cors')
const router = require('express').Router()
dotenv.config()
router.use(cors())

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
    const body = {
      source: req.body.token.id,
      amount: Number(req.body.amount),
      currency: 'usd'
    }
    stripe.charges.create(body, stripeChargeCallback(res))
  } catch (err) {
    next(err)
  }
})

module.exports = router
