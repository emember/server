// var AWS =require('aws-sdk');
// AWS.config= new AWS.Config({
// 	accessKeyId: 'AKIAJR3BJ3ATVX3NKCSA'
// 	,secretAccessKey: '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'
// 	,region: 'us-west-2'
// });


var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
	keyPath:'./cert/key.pem'
	,certPath:'./cert/cert.pem'
	,caPath:'./cert/rootCA.pem'
	,clientId:'ememberBackend'
	,host:'a3ihzykgqzp1ol.iot.us-west-2.amazonaws.com'
});



device.on('connect',()=>{
	console.log('connect');
    device.subscribe('f4035320-be1f-4e71-8005-2363a6f074ee/test');
});

device.on('close', function() {
    console.log('close');
});

device.on('reconnect', function(){
    console.log('reconnect');
});

device.on('offline', function() {
    console.log('offline');
});

device.on('error', function(error) {
    console.log('error', error);
});

device.on('message', function(topic, payload) {
	console.log('~~~~~message', topic, payload.toString());
});

