var moment = require('moment');

function getLevelNTopic(topic, n){
	var levels = topic.split('/');
	return levels[n];
}

function getEntity(entityStr){
	return require('./entity/'+entityStr);
}

function log(msg){
	if(constants.DEBUG){
		console.log(moment().format(),msg);
	}
}

module.exports={
	getLevelNTopic:getLevelNTopic,
	getEntity:getEntity,
	log:log
}