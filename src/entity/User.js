import {Constant} from 'util/Constant';
import {AppUtil} from 'util/AppUtil';
import {Neo4jManager} from 'dataManager/Neo4jManager';


class User{
	 execute(action, para){
		switch(action){
			case Constant.CREATE:
                create(para);
				break;
			case Constant.LOGIN:
                login(para);
				break;
			case Constant.SEND_SC:
                sendSecurityCode(para);
				break;
            case Constant.VERIFY:
                verify(para);
                break;
            case Constant.SET_PIN:
                setPin(para);
                break;
		}
	}
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