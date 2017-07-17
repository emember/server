import {Constant} from 'util/Constant';

class User{
	 execute(action, para){
	 	let requests=[];
		switch(action){
			case Constant.CREATE:
                requests=create(para);
				break;
			case Constant.VALIDATE:
                requests=validate(para);
				break;
			case Constant.ACTIVATE:
                requests=activate(para);
				break;
			case Constant.RESET_SC:
                requests=resetSecurityCode(para);
				break;
            case Constant.VERIFY:
                requests=verify(para);
                break;
		}
		return requests;
	}
}

function verify(para, callback){
    let requests=[];
	var query ="match (c:company {companyId:{companyId}})\
	match (c) -[r:hasUser]->(u:user {securityCode:{securityCode}}) \
	return {userId:u.userId}";

    requests.push({
		topic:Constant.NEO4J,
		payload:{
			ticketNo:para.ticketNo,
			query:query,
			para:para
		}
	});
    return requests;
}


function resetSecurityCode(para) {
	console.log('~~func called~~',para);
    var query="match (c:company {companyId:{companyId}}) \
				match(c)-[r:hasUser]->(u:user {token:{token}}) \
				set u.securityCode='369' ";
}

function create(para){
	var query="match (c:company {companyId:{companyId}}) \
				create(c)-[r:hasAppUser]->(u:appUser) \
				set u.securityCode='888' \
				return u";
}

function validate(para) {

    var query = "match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {appId:{appId}, appKey:{appKey}}) \
	set u.token={token} \
	return count(u)>0";
}

function activate(para) {

    var query = "match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {activationCode:{activationCode}}) \
	set u.token={token} \
	return {appId:u.appId, appKey:u.appKey}";
}

export {User}