import {User} from './User';
import {Member} from './Member';
import {Visit} from './Visit';

class EntityManager{
	static callEntityFunc(entityStr, func, para, cb){
        let obj;
		switch (entityStr){
			case 'user':
                obj = new User();
                break;
			case 'member':
                obj = new Member();
				break;
			case 'visit':
                obj = new Visit();
		}
        console.log('~~~~~entity func called ~~~',entityStr, func, obj);
        obj[func](para, cb);
	}
}

export {EntityManager};