/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push({
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                'postcss-loader'
            ]
        });

        return config;
    },
};