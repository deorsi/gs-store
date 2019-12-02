import Stripe from "stripe"
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import calculateCartTotal from '../../utils/calculateCartTotal'


const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export defaul async (req, res) {
  const { paymentData } = req.body

  try {
    // verify and get user id from token
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // find cart based on user id, populate it
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    })
    // calculate cart totals again from cart products
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products)
    // get email from payment data and see if email is linked with exist stripe customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1 // one customer returning
    })
    const isExistingCustomer = prevCustomerdata.length > 0;
    // if not existing customer creating them with their email
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      })
    }
    const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    // create charge with total , send receipt email
    const charge = await stripe.charges.create({
      currency: "brl",
      amount: stripeTotal,
      receipt_email: paymentData.email,
      customer,
      description: `Checkout | ${paymentData.email} | ${paymentData.id}`
    }, {
      idempotency_key: uuidv4()
    })
    // add order data to db
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products
    }).save()
    // clear products in cart
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $set: { products: []}}
    )
    // send back success response (200)
    res.status(200).send("Checkout foi um sucesso")
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao processar pagamento")
  }
}