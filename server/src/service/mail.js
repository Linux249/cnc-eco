const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
    process.env.SENDGRID_API_KEY ||
        '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'
);
const msg = {
    to: 'julian.libor@gmail.com',
    from: 'login@cnc-eco.de',
    subject: 'Please verify your email for cnc-eco.de',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

export async function sendMail(token, mail) {
    console.log('sendMail');
    msg.to = mail;
    const body =
        'Hello,\n\n' +
        'Please verify your account by clicking the link: \nhttps://cnc-eco.herokuapp.com/api/v1/local/verify?token=' +
        token.token +
        '.\n';
    msg.text = body;
    msg.html = body;
    console.log(msg);
    try {
        return await sgMail.send(msg);
    } catch (e) {
        console.error(e);
    }
}
