import nodemailer from 'nodemailer';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
    process.env.SENDGRID_API_KEY ||
        ''
);

const msg = {
    to: 'julian.libor@gmail.com',
    from: 'info@cnc-eco.de',
    subject: 'Please verify your email for cnc-eco.de',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const transporter = nodemailer.createTransport({
    // host: "ha01s001.org-dns.com",
    host: 'smtp.cnc-eco.de',
    port: 587,
    // secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.EMAIL_USER || 'email',
        pass: process.env.EMAIL_PASS || 'pass',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export async function sendToken(token, mail) {
    console.log('sendToken');
    msg.to = mail;
    const body =
        'Hello,\n\n' +
        'Please verify your account by clicking the link: \n' +
        'https://www.cnc-eco.herokuapp.com' +
        '/api/v1/local/verify?token=' +
        token.token +
        '\n';
    msg.text = body;
    msg.html = body;
    console.log(msg);
    try {
        // const info = await transporter.sendMail(msg);
        const info = await sgMail.send(msg);
        console.log('Message sent: ', info.messageId);
        console.log(info);
    } catch (e) {
        console.error(e);
    }
}

export async function sendPassword(token, mail) {
    console.log('sendToken');
    msg.to = mail;
    const body =
        'Hello,\n\n' +
        'Please update your password by clicking the link: \n' +
        'https://www.cnc-eco.de' +
        '/reset/' +
        token.token +
        '\n';
    msg.text = body;
    msg.html = body;
    console.log(msg);
    try {
        // const info = await transporter.sendMail(msg);
        const info = await sgMail.send(msg);
        console.log('Message sent: ', info.messageId);
        console.log(info);
    } catch (e) {
        console.error(e);
    }
}
