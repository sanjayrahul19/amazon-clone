import React from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from '../../components/paymentForm/PaymentForm';

const stripePromise = loadStripe('pk_test_51MoKafGXNqS9rLe4jKzxeimHKdwsMDRTWx8rZepkCxFCC3oTswE3AhBrAoEX9KfUaqbPV6QciK9j1MPRaT0T1yzw00q0BL1I8M')

const Payment = () => {
  const { id } = useParams();
  const options = {
    clientSecret: id,
    appearance: {
      theme: 'stripe'
    }
  }
  return (

    <div className='payment'>
      {
        id && (
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm secretKey={id} />
          </Elements>
        )
      }
    </div>
  )
}

export default Payment