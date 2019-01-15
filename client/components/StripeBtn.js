import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeBtn = props => {
  const publishableKey = 'pk_test_t67F4aTuwM0aWGvR2Wl5PxVS'

  const onToken = token => {
    console.log(token)
    const body = {
      amount: 999,
      token: token
    }

    axios
      .post('/api/payment', body)
      .then(response => {
        props.checkoutButton()
        alert('Payment Success')
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        alert('Payment Error')
      })
  }

  return (
    <StripeCheckout
      label="Stripe Checkout" // Component button text
      name="Duck Sales" // Modal Header
      description="Please fill in the information below."
      panelLabel="Stripe Checkout" // Submit button in modal
      amount={999} // Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
  )
}
export default StripeBtn
