function getLevelNTopic(topic, n){
	var levels = topic.split('/');
	return levels[n];
}

function getEntity(entityStr){
	return require('./entity/'+entityStr);
}


module.exports={
	getLevelNTopic:getLevelNTopic,
	getEntity:getEntity
}