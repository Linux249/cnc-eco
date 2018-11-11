const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cncecoserver@gmail.com', // TODO config for Login dev/prod
        pass: 'yourpassword',
    },
});

const mailOptions = {
    from: 'cncecoserver@gmail.com',
    to: 'julian.libor@gmail.com',
    subject: 'CnCEco Web-Server status',
    text: 'That was easy!',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Email sent: ${info.response}`);
    }
});
