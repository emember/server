global.constants=require('./constants');

var util =require('./util');

var mqtt = require('mqtt');
global.mqttClientOne= mqtt.connect('tcp://54.187.14.85:1883');
global.mqttClientTwo= mqtt.connect('tcp://54.187.14.85:1883');


mqttClientOne.on('connect', function () {
	mqttClientOne.subscribe(constants.COMPANY_ID+'#');
});
 

mqttClientOne.on('message', function (topic, message) {
	var entityStr =util.getLevelNTopic(topic, constants.ENTITY_IDX);
	var action =util.getLevelNTopic(topic, constants.ACTION_IDX);
	var entity =util.getEntity(entityStr);
	
	entity.execute(action, JSON.parse(message.toString()));

});

