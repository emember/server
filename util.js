function getLevelNTopic(topic, n){
	var levels = topic.split('/');
	return levels[n];
}

function getEntity(entityStr){
	return require('./entity/'+entityStr);
}

function toPayload(obj){
	return JSON.stringify(obj);
}

module.exports={
	getLevelNTopic:getLevelNTopic,
	getEntity:getEntity,
	toPayload:toPayload
}