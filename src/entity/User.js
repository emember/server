import {Constant} from 'util/Constant';
import {AppUtil} from 'util/AppUtil';
import {Neo4jManager} from 'dataManager/Neo4jManager';


class User{
	 execute(action, para, cb){
		switch(action){
            case Constant.LIST:
                list(para, cb);
                break;
			case Constant.CREATE:
                create(para, cb);
				break;
			case Constant.LOGIN:
                login(para, cb);
				break;
			case Constant.SEND_SC:
                sendSecurityCode(para, cb);
				break;
            case Constant.VERIFY:
                verify(para, cb);
                break;
            case Constant.SET_PIN:
                setPin(para,cb);
                break;
		}
	}
}

function list(para, cb) {
    let query = "match (u:user) \
                return {userId:u.userId, firstname:u.firstname, lastname:u.lastname, email:u.email}"
    Neo4jManager.process(query, para, cb);
}

function setPin(para) {
    var query ="match (u:user {email:{email}}) \
	set u.pin={pin}";

    Neo4jManager.process(query, para);
}

function verify(para){
	var query ="match (u:user {email:{email}, securityCode:{securityCode}}) \
	return {userId:u.email}";

    Neo4jManager.process(query, para);
}


function sendSecurityCode(para) {
    var query="match (u:user {email:{email}}) \
				set u.securityCode='888000' ";
    //need to email out new securityCode to user

    Neo4jManager.process(query, para);
}

function create(para){
	var query="create (u:user) \
				set u.securityCode='888' \
				return u";
}

function login(para) {
    var query = "match (u:user {email:{email}, pin:{pin}}) \
	return {userId:u.email}";

    Neo4jManager.process(query, para);
}

function activate(para) {

    var query = "match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {activationCode:{activationCode}}) \
	set u.token={token} \
	return {appId:u.appId, appKey:u.appKey}";
}

export {User}