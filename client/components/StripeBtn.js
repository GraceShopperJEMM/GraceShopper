import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeBtn = props => {
  const publishableKey = 'pk_test_t67F4aTuwM0aWGvR2Wl5PxVS'
  const amount = props.total

  const onToken = token => {
    const body = {
      amount,
      token: token
    }
    const goodToOrder = props.verifyCart()
    if (goodToOrder) {
      axios
        .post('/api/payment', body)
        .then(response => {
          props.checkoutButton(response)
          alert('Payment Success')
        })
        .catch(error => {
          console.log('Payment Error: ', error)
          alert('Payment Error')
        })
    } else {
      alert('Something went wrong!')
    }
  }

  return (
    <StripeCheckout
      label="Checkout"
      name="Duck Sales"
      description="Please fill in the information below."
      panelLabel="Stripe Checkout"
      amount={amount} // Amount in cents
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={true}
    />
  )
}
export default StripeBtn
