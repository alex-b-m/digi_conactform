const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const nodeMailer = require('nodemailer')

app.use(express.json({ extended: true }))
app.use(require('cors')())

app.post('/form', (req, res) => {
  const { name, subject, email, message } = req.body
  nodeMailer.createTestAccount((err, account) => {
    const emailTemplate = `
          <h3>Digi Prophets Contact Form</h3>
          <h4>From: ${name}</h4>
          <h4>Email: ${email}</h4>
          <h4>Subject: ${subject}</h4>
          <p>Message: ${message}</p>
`

    let transporter = nodeMailer.createTransport({
      host: 'smtp.digiprophets.com',
      port: 587,
      auth: {
        user: 'info@digiprophets.com',
        pass: '',
      },
    })
    let mailOptions = {
      from: email,
      to: 'pmusole2@gmail.com',
      replyTo: null,
      subject: 'DigiProphets Contact Form',
      text: subject,
      html: emailTemplate,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err)
      res.json({ message: 'Message sent successfully', info })
    })
  })
})

app.get('/', (req, res) => res.send(`Connected to Server on Port ${PORT}`))

app.listen(PORT, () => console.log('PORT Ready'))
