import React, { useEffect, useState } from 'react';
import "./PaymentForm.css";
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

const PaymentForm = ({ secretKey }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState(false)
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setClientSecret(secretKey)
    }, [secretKey])

    useEffect(() => {
        if (!stripe) return;
        if (!clientSecret) return

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setErrorMessage(true)
                    setMessage("Your payment is processing")
                    break;
                case "requires_payment_method":
                    setErrorMessage(false);
                    setMessage("Your payment was not successful,please try again")
                    break;
                default:
                    setErrorMessage(true)
                    setMessage("Something went wrong")
                    break;
            }
        })
    }, [stripe, clientSecret])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/orders"
            }
        })

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage("An unexpected Error Occurred")
        }
        setIsLoading(false)
    }

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement id='payment-element' />
            <button className='payment-button' disabled={isLoading || !stripe || !elements}>
                <span id='button-text'>
                    {isLoading ? <button className='spinner' id='spinner' disabled={isLoading}></button> : "Pay Now"}
                </span>
            </button>
            {
                errorMessage && message && <div id='payment-message'>{message}</div>
            }
        </form>
    )
}

export default PaymentForm