var AWS =require('aws-sdk');
AWS.config= new AWS.Config({
    accessKeyId: 'AKIAJR3BJ3ATVX3NKCSA'
    ,secretAccessKey: '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'
    ,region: 'us-west-2'
});

console.log(AWS.config);

var iot = new AWS.Iot();

var params ={
    setAsActive:true
};

iot.createKeysAndCertificate(params,(err, data)=>{
    if(err){
        console.log(err, err.stack)
    }else {
        console.log(data)
    }
});