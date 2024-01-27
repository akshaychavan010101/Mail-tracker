const express = require('express');
const nodemailer = require('nodemailer');
const ENV = require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: "Welcome to Email Tracking System" })
})
app.post('/send', (req, res) => {
    const { email, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: `${ENV.SERVICE}`,
            auth: {
                user: `${ENV.EMAIL}`,
                pass: `${ENV.PASS}`
            }
        })

        const url = `${ENV.SERVER_URL}/tracking?email=${email}`;
        const html = `
            <h3>Email Tracking Detail</h3>
            <img src="${url}"/>
            <p>${message}</p>
        `
        const mailOptions = {
            from: `${ENV.EMAIL}`,
            to: email,
            subject: subject,
            html: html
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send({ error: error });
            } else {
                console.log('Email sent: ' + info.response);
                res.send({ message: 'Email sent successfully' });
            }
        })
    } catch (error) {
        res.send({ error: error });
    }
})

app.get('/tracking', (req, res) => {
    const { email } = req.query;
    console.log(`${email} opened the email`);
    res.status(204)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})