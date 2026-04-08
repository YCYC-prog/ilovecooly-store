import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const customerEmail = session.customer_details.email;

    // 🔗 YOUR FILE (host on AWS S3, Cloudinary, or Firebase)
    const downloadLink = "https://yourstorage.com/midnight-drip.wav";

    // 📄 LICENSE (can be static PDF or generated)
    const licenseLink = ""C:\Users\User\Downloads\iLoveCooly_License_Agreement.pdf"";

    // 📧 SEND EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"iLoveCooly" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: "Your Beat Purchase – iLoveCooly",
      html: `
        <h2>Thank you for your purchase</h2>
        <p>You now have access to your beat.</p>
        
        <a href="${downloadLink}">Download Beat</a><br/><br/>
        <a href="${licenseLink}">Download License</a>
        
        <p>– Only1Living Music Group</p>
      `,
    });
  }

  res.json({ received: true });
}