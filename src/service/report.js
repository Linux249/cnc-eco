const nodemailer = require('nodemailer');



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cncecoserver@gmail.com',    // TODO config for Login dev/prod
        pass: 'yourpassword'
    }
});

const report = {
    date: new Date(),   // current time
    server: [
        /*
        * size: MB  // DB size
         */
    ],
    worlds: [
        /* {
        * world: name,
        * deletedLayouts: count,
        * docs: count, // after delte = #layouts
        * size: MB,       // collection size
        *
         */
    ],
    player: {
        /*
        * docs: count // count docs
        * size: MB //size of collection,
        * newestPlayer: [{ playername , worlds }]
         */
    }

}

let mailOptions = {
    from: 'cncecoserver@gmail.com',
    to: 'julian.libor@gmail.com',
    subject: 'CnCEco Web-Server status',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});