import {Neo4jManager} from '../dataManager/Neo4jManager';


class User{

    list(para, cb) {
        let query = "match (u:user{active:1})  \
                     with u \
                return { totalCount:count(u), items:collect({userId:u.userId, firstname:u.firstname, lastname:u.lastname, email:u.email})}"
        Neo4jManager.process(query, para, cb);
    }

    setPin(para) {
        var query ="match (u:user {email:{email}}) \
	set u.pin={pin}";

        Neo4jManager.process(query, para);
    }

    verify(para){
        var query ="match (u:user {email:{email}, securityCode:{securityCode}}) \
	return {userId:u.email}";

        Neo4jManager.process(query, para);
    }


    sendSecurityCode(para) {
        var query="match (u:user {email:{email}}) \
				set u.securityCode='888000' ";
        //need to email out new securityCode to user

        Neo4jManager.process(query, para);
    }

    create(para){
        var query="create (u:user) \
				set u.securityCode='888' \
				return u";
    }

    login(para) {
        var query = "match (u:user {email:{email}, pin:{pin}}) \
	return {userId:u.email}";

        Neo4jManager.process(query, para);
    }

    wlogin(para, cb){
        cb(null,{});
    }

    activate(para) {

        var query = "match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {activationCode:{activationCode}}) \
	set u.token={token} \
	return {appId:u.appId, appKey:u.appKey}";
    }

    save(para, cb) {
        var query ="merge (u:user {userId:{userId}}) \
    set u.firstname={firstname}, u.lastname={lastname}, u.email={email}, u.active=1";

        Neo4jManager.process(query, para.user, cb);
    }


    remove(para, cb){
        var query ="match (u:user) \
    where u.userId in {userIds} \
    set u.active=0 ";

        console.log(para, '~~~~!!!!!!!!!!!~~~~', query);
        Neo4jManager.process(query, para, cb);
    }
}

export {User}

// execute(func, para, cb){
//     switch(func){
//         case Constant.LIST:
//             list(para, cb);
//             break;
//         case Constant.SAVE:
//             save(para, cb);
//             break;
//         case Constant.REMOVE:
//             remove(para, cb);
//             break;
//         case Constant.CREATE:
//             create(para, cb);
//             break;
//         case Constant.LOGIN:
//             login(para, cb);
//             break;
//         case Constant.WLOGIN:
//             wlogin(para, cb);
//             break;
//         case Constant.SEND_SC:
//             sendSecurityCode(para, cb);
//             break;
//         case Constant.VERIFY:
//             verify(para, cb);
//             break;
//         case Constant.SET_PIN:
//             setPin(para,cb);
//             break;
//         default:
//             cb(null,{func:'no'});
//             break;
//     }
// }
