if(process.env.NODE_ENV === 'production') {
    module.exports = {
        facebookAuth: {
            'clientID': 'your-secret-clientID-here', // your App ID
            'clientSecret': 'your-client-secret-here', // your App Secret
            'callbackURL': 'http://localhost:8000/auth/facebook/callback',
            'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
            'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
        },
        twitterAuth: {
            'consumerKey': 'your-consumer-key-here',
            'consumerSecret': 'your-client-secret-here',
            'callbackURL': 'http://localhost:8000/auth/twitter/callback'
        },
        googleAuth: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            'callbackURL': 'https://cnc-eco.herokuapp.com/api/v1/auth/google/callback'
        },
        cookieSecret: process.env.COOKIE_SECRET,
        mongoURI: process.env.MONGODB_URI

    }

} else {
    module.exports = require('./dev')
}


