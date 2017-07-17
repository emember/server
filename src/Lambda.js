import {Configuration} from 'util/Configuration';
import {LogFactory} from 'util/LogFactory';
import {Constant} from 'util/Constant';
import {AppUtil} from 'util/AppUtil';

exports.handler = (event, context, callback) => {
    let logger= LogFactory.getLogger();
    let config= new Configuration();

    logger.info('Starting server');

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // var para =JSON.parse(event.body);
    // var entity;
    // entity=require('./'+para.entity);
    // entity.execute(para.func, para, done);
};


/*****old code*******/


// let mqttClient= mqtt.connect({
// 	host:config.mqttBrokerHost
//     ,port:config.mqttBrokerPort
//     ,username:config.mqttBrokerUsr
//     ,password:config.mqttBrokerPwd
// });
//
// mqttClient.on('error',err=>{
//     logger.err('Err from mqtt broker',err)
// });
//
// mqttClient.on('connect',()=> {
//     logger.info('Connected to mqtt broker');
// 	mqttClient.subscribe(Constant.TOPIC_COMPANY_ID+'#');
// });
//
// mqttClient.on('message', (topic, message)=> {
// 	let entity =AppUtil.getLevelNTopic(topic, Constant.ENTITY_IDX);
//     let func =AppUtil.getLevelNTopic(topic, Constant.FUNC_IDX);
//
// 	let para=message.toString()?JSON.parse(message.toString()):{};
//
//     para.companyId=Constant.COMPANY_ID;
//     para.token=AppUtil.getLevelNTopic(topic, Constant.APP_ID_IDX);
//     para.entity=entity;
//     para.func=func;
//
//     AppUtil.callEntityFunc(entity, func, para);
// });
//
