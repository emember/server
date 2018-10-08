import {User} from './User';
import {Member} from './Member';
import {Visit} from './Visit';

class HandlerManager{
	static async callFunc(apiCallPara, cb){
		let obj;
		switch (apiCallPara.handler) {
			case 'user':
				obj = new User();
				break;
			case 'member':
				obj = new Member();
				break;
			case 'visit':
				obj = new Visit();
		}
		return obj[apiCallPara.func](apiCallPara);
	}
}

export {HandlerManager};