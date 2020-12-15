const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const msg = {
    to: '',
    from: 'info@cnc-eco.de',
    dynamic_template_data: {
        token: '',
    },
    template_id: 'd-421069ce61c94c9ca911b99ec0794ec5',
};

export async function sendVerification(token, mail) {
    console.log('Send verification email to ', mail);
    msg.to = mail;
    msg.dynamic_template_data.token = token.token;
    console.log(msg);
    try {
        const info = await sgMail.send(msg);
        console.log('Verify message sent: ', info.messageId);
    } catch (e) {
        console.error(e);
    }
}

export async function sendResetPassword(token, mail) {
    console.log('sendResetPassword');
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
    msg.subject = 'Reset password';
    console.log(msg);
    try {
        const info = await sgMail.send(msg);
        console.log('Message sent: ', info.messageId);
        console.log(info);
    } catch (e) {
        console.error(e);
    }
}
