import {Constant} from 'util/Constant';
import {AppUtil} from 'util/AppUtil';

class User{
	 execute(action, para){
	 	let requests=[];
		switch(action){
			case Constant.CREATE:
                requests=create(para);
				break;
			case Constant.LOGIN:
                requests=login(para);
				break;
			case Constant.SEND_SC:
                requests=sendSecurityCode(para);
				break;
            case Constant.VERIFY:
                requests=verify(para);
                break;
            case Constant.SET_PIN:
                requests=setPin(para);
                break;
		}
		return requests;
	}
}

function setPin(para) {
    var query ="match (c:company {companyId:{companyId}})\
	match (c) -[r:hasUser]->(u:user {email:{email}}) \
	set u.pin={pin}";

    let requests=[];
    requests.push({
        topic:AppUtil.makeTopic([Constant.DATA_MANAGER,Constant.NEO4J]),
        payload:{
            resTopic:para.resTopic,
            query:query,
            para:para
        }
    });
    return requests;
}

function verify(para){
	var query ="match (c:company {companyId:{companyId}})\
	match (c) -[r:hasUser]->(u:user {email:{email}, securityCode:{securityCode}}) \
	return {userId:u.email}";

    let requests=[];
    requests.push({
        topic:AppUtil.makeTopic([Constant.DATA_MANAGER,Constant.NEO4J]),
		payload:{
			resTopic:para.resTopic,
			query:query,
			para:para
		}
	});
    return requests;
}


function sendSecurityCode(para) {
    var query="match (c:company {companyId:{companyId}}) \
				match(c)-[r:hasUser]->(u:user {email:{email}}) \
				set u.securityCode='888000' ";
    //need to email out new securityCode to user

    let requests=[];
    requests.push({
        topic:AppUtil.makeTopic([Constant.DATA_MANAGER,Constant.NEO4J]),
        payload:{
            resTopic:para.resTopic,
            query:query,
            para:para
        }
    });
    return requests;

}

function create(para){
	var query="match (c:company {companyId:{companyId}}) \
				create(c)-[r:hasAppUser]->(u:appUser) \
				set u.securityCode='888' \
				return u";
}

function login(para) {
    var query = "match (c:company {companyId:{companyId}})\
	match (c) -[r:hasUser]->(u:user {email:{email}, pin:{pin}}) \
	return {userId:u.email}";

    let requests=[];
    requests.push({
        topic:AppUtil.makeTopic([Constant.DATA_MANAGER,Constant.NEO4J]),
        payload:{
            resTopic:para.resTopic,
            query:query,
            para:para
        }
    });
    return requests;
}

function activate(para) {

    var query = "match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {activationCode:{activationCode}}) \
	set u.token={token} \
	return {appId:u.appId, appKey:u.appKey}";
}

export {User}