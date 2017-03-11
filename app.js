global.constants=require('./constants');

global.util =require('./util');

var mqtt = require('mqtt');
global.mqttClientUI= mqtt.connect('tcp://35.164.176.15:1883');
global.mqttClientData= mqtt.connect('tcp://35.164.176.15:1883');


mqttClientUI.on('connect', function () {
	mqttClientUI.subscribe(constants.TOPIC_COMPANY_ID+'#');
});
 

mqttClientUI.on('message', function (topic, message) {
	var entityStr =util.getLevelNTopic(topic, constants.ENTITY_IDX);
	var entity =util.getEntity(entityStr);	

	var action =util.getLevelNTopic(topic, constants.ACTION_IDX);
	var para=message.toString()?JSON.parse(message.toString()):{};

	entity.execute(action, para);
});

