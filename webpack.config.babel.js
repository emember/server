import path from 'path';

export default {
    entry:{
        // Lambda:'./src/Lambda.js',

        // Server:'./src/Server.js',
        API:'./src/API.js',
        // MessageHandlerTest:'./test/MessageHandlerTest.js',
        // S3ManagerTest:'./test/S3ManagerTest.js',

        // ConstantTest:'./test/ConstantTest.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    resolve:{
        modules:[path.resolve('./src'), path.resolve('./node_modules')]
    },
    module:{
        rules:[
            {
                test: /\.js/,
                exclude:/(node_modules|bower_components)/,
                use:[{loader:'babel-loader'}]
            }
        ]
    },
    node:{
        fs:'empty',
        tls:'empty'
    },
    plugins:[],
    stats:{
        colors:true
    },
    devtool:'source-map'
};
