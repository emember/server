import awsIot from 'aws-iot-device-sdk';
import path from 'path';

const device = awsIot.device({
    host:'a3ihzykgqzp1ol.iot.us-west-2.amazonaws.com'
    ,clientId:'ememberBackend' //a26e840b7d3814770c4f232ceea8d4d8ec31e20a20da56759a39beb5a2878f8b
    ,keyPath:path.resolve(__dirname,'cert/key.pem')
    ,certPath:path.resolve(__dirname,'cert/cert.pem')
    ,caPath:path.resolve(__dirname,'cert/rootCA.pem')
    // ,keyPath:'./cert/key.pem'
    // ,certPath:'./cert/cert.pem'
    // ,caPath:'./cert/rootCA.pem'
});

class AwsIotUtil
{
    static init(msgb){
        device.on('connect',()=>{
            console.log('connect');
            device.subscribe('f4035320-be1f-4e71-8005-2363a6f074ee/in/#');
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
            console.log('~~~~~message received~~~');
            console.log('~~topic~~~',topic);
            console.log('~~~data~~~~',payload.toString())
            msgb(topic, JSON.parse(payload.toString()));
        });
    }

    static publish(topic, payload){
        device.publish(topic, JSON.stringify(payload));
    }

    static subscribe(){

    }
}

export {AwsIotUtil}