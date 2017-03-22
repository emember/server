/*** lib **/
global.uuid =require('uuid/v4');


/*** app **/
global.constants=require('./constants');
global.util =require('./util');

/*** main **/
var mqtt = require('mqtt');
global.uiQFitting= mqtt.connect('tcp://35.164.176.15:1883');
global.dataQFitting= mqtt.connect('tcp://35.164.176.15:1883');


uiQFitting.on('connect', function () {
	uiQFitting.subscribe(constants.TOPIC_COMPANY_ID+'#');
});
 

uiQFitting.on('message', function (topic, message) {
	util.log(topic);
	
	var entityStr =util.getLevelNTopic(topic, constants.ENTITY_IDX);
	var entity =util.getEntity(entityStr);	

	var action =util.getLevelNTopic(topic, constants.ACTION_IDX);
	var para=message.toString()?JSON.parse(message.toString()):{};

	entity.execute(action, para);

});

