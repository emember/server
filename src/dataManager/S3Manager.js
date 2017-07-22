class S3Manager{
    static process(payload){
        console.log('~~~~s3 process files~~~~',payload);
        var AWS = require('aws-sdk');

        var awsConfig = new AWS.Config({
            accessKeyId: 'AKIAISXBE5UFZAO447YQ',
            secretAccessKey:'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',
            region: 'us-west-2'
        });

        AWS.config=awsConfig;

        var s3 = new AWS.S3( { params: {Bucket: 'emember.dev'} } );

        var date = new Date();
        payload.forEach(function(item){
            var options={
                Key:item.filename,
                Body:new Buffer(item.data.replace(/^data:image\/\w+;base64,/, ""),'base64'),
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            };

            s3.putObject(options, function(err,data){
                if(err){
                    console.log('~~s3 error~',err);
                }else{
                    console.log('~~s3 success~'+date.toTimeString());
                }
            });
        });
    }
}

export {S3Manager}