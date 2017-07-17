'use strict'

const path = require('path');
const webpack= require('webpack');
const fs = require("fs");

let nodeModules = {};
fs.readdirSync("node_modules").filter(
    (x) => {
        return [".bin"].indexOf(x) === -1;
    }
).forEach(
    (mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    }
);


module.exports={
    entry:{
        // Main:'./src/Lambda.js',

        Server:'./src/Server.js',

        // ConstantTest:'./test/ConstantTest.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    resolve:{
        modules:[path.resolve('./src'), path.resolve('./node_modules')]
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                enforce:'pre',
// enforce:'post',
                include:[path.resolve('./src')],
                loader:'babel-loader'
            }
        ]
    },
    node:{
        console:true,
        __dirname:true,
        fs:'empty',
        net:'empty',
        tls:'empty',
        child_process:'empty'
    },
    target:'node',
    plugins:[
        new webpack.DefinePlugin({'global.GENTLY':false})
    ],
    externals: nodeModules
};
