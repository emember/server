import {User} from 'entity/User';

class AppUtil{
	static getLevelNTopic(topic, n){
		let levels = topic.split('/');
		return levels[n];
	}

	static callEntityFunc(entityStr, func, para){
		let obj;
		switch (entityStr){
			case 'user':
                obj = new User();
		}

		obj.execute(func,para);
	}
}

export {AppUtil};