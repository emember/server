class AppUtil{
	static getLevelNTopic(topic, n){
		let levels = topic.split('/');
		return levels[n];
	}

	static makeTopic(array){
		let topic=array[0];
		for(let i=0;i<array.length;i++){
            topic+="/"+array[i];
		}
		return topic;
	}
}

export {AppUtil};