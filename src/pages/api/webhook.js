import * as admin from 'firebase-admin';

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

// Connection to firebase
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Order ${session.id} has been added to the DB`);
    });
};

export default async (req, res) => {
  let post = 'POST';
  if (req.method === post) {
    const requestBuffer = await buffer(req);
    // console.log(requestBuffer);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    // Verify that the event posted came from Stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Fulfill the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
