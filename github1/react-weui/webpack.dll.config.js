var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理文件夹
var path = require('path');

var ROOT_PATH = path.resolve(__dirname); // 项目根路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/dist'); // 发布文件所存放的目录


//dll尚未使用
module.exports = {
    entry: {
        bundle: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'redux-thunk',
            'immutable'
        ],
    },
    output: {
        publicPath: '/dist/',
        path:  BUILD_PATH,
        filename: '[name].[chunkhash].js',
        library: '[name]_library'
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
          root: ROOT_PATH,
          verbose: true,
          dry: false
        }),
        new webpack.DllPlugin({
            path: './build/dist/bundle.manifest.json',
            name: '[name]_library',
        }),
       new AssetsPlugin({
        	filename: 'bundle-config.json', 
        	path: './build/dist',
        }),
    ]
};