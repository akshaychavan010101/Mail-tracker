const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.post('/send', (req, res) => {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vaibhavbhanderi5@gmail.com',
            pass: 'mzkfhqhavjwriufw'
        }
    })

    const url = `http://localhost:3000/tracking?email=${email}`;
    const html = `
        <h3>Email Tracking Detail</h3>
        <img src="${url}"/>
        <p>${message}</p>
    `
    const mailOptions = {
        from: 'vaibhavbhanderi5@gmail.com',
        to: email,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
})

app.get('/tracking', (req, res) => {
    const { email } = req.query;
    console.log(`${email} opened the email`);
    res.status(204)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})