var moment = require('moment');

var mqtt = require('mqtt');
var uiQFitting= mqtt.connect('tcp://35.164.176.15:1883');
var dataQFitting= mqtt.connect('tcp://35.164.176.15:1883');


function getLevelNTopic(topic, n){
	var levels = topic.split('/');
	return levels[n];
}

function getEntity(entityStr){
	return require('./entity/'+entityStr);
}

function log(msg){
	if(constants.DEBUG){
		console.log('~~ server~~~'+moment().format(),msg);
	}
}

module.exports={
	getLevelNTopic:getLevelNTopic,
	getEntity:getEntity,
	log:log
}