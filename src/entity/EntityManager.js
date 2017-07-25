import {User} from './User';
import {Member} from './Member';

class EntityManager{
	static callEntityFunc(entityStr, func, para){
        let obj;
		switch (entityStr){
			case 'user':
                obj = new User();
                break;
			case 'member':
                obj = new Member();
				break;
		}
        console.log('~~~~~entity func called ~~~',entityStr, func, obj);
		obj.execute(func, para);
	}
}

export {EntityManager};