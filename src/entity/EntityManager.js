import {User} from './User';

class EntityManager{
	static callEntityFunc(entityStr, func, para){
		let obj;
		switch (entityStr){
			case 'user':
                obj = new User();
		}

		return obj.execute(func,para);
	}
}

export {EntityManager};