const {injectBabelPlugin} = require('react-app-rewired')
const rewireless = require('react-app-rewire-less')

module.exports = function override(config, env) {
    config = injectBabelPlugin([
        'import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }
    ], config)
    config = injectBabelPlugin("transform-decorators-legacy", config)
    config = injectBabelPlugin("transform-class-properties", config)
    config = rewireless.withLoaderOptions({modifyvars: {
            //"@primary-color": "#1DA57A"
        }, javascriptEnabled: true})(config, env)
    return config;
}