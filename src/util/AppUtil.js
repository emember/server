class AppUtil{
	static getLevelNTopic(topic, n){
		let levels = topic.split('/');
		return levels[n];
    }

	static makeTopic(array){
		let topic=array[0];
		for(let i=1;i<array.length;i++){
            topic+="/"+array[i];
		}
		return topic;
	}

	static makeDataReq(topic, query, para){
		let request={
            topic:topic,
            payload:{
                ticketNo:para.ticketNo,
                query:query,
                para:para
            }
		}
		return request;
	}
}

export {AppUtil};