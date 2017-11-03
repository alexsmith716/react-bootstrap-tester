const autoprefixer = require('autoprefixer');

console.log('>>>>>>>> postcss.config.js <<<<<<<<<<<<');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: [
                'last 2 versions',
                'IE >= 9',
                'safari >= 8'
            ]
        })
    ]
};