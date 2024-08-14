const path = require('path')
const pak = require('../../../package.json')

module.exports = function(api) {
    api.cache(true)

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        'stan-js-devtools': path.resolve(__dirname, '../../../src/index.ts'),
                    },
                },
            ],
        ],
    }
}
