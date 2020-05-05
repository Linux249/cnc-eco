// next.config.js
//const withImages = require('next-images');

module.exports = {
    webpack: (config, { isServer }) => {
        config.module.rules.push(
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: isServer,
                            publicPath: `/_next/static/`,
                            outputPath: `${isServer ? '../' : ''}static/`,
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts)x?$/,
                },
                use: ['@svgr/webpack'],
            }
        );

        return config;
    },
};
