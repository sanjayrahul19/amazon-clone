import { checkout } from "../../model/checkout.js";
import { responseHandler } from "../../response/responseHandler.js";
import { v4 as uuid } from "uuid"
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_KEY)


export const createPaymentIntent = async (req, res) => {
    try {
        const { total, items } = req.body
        const orderId = uuid()

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: "inr",
            metadata: {
                order_id: orderId
            }
        })

        await checkout.create({
            items,
            total,
            order_id: orderId,
            payment_id: paymentIntent.id,
            user: req.userId
        })

        return responseHandler(res, 200, "Payment Intent Created Successfully", true, paymentIntent.client_secret)

    } catch (error) {
        return responseHandler(res, 500, error.message, false)
    }
}