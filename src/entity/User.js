import {Constant} from 'util/Constant';

class User{
	 execute(action, para){
		switch(action){
			case Constant.CREATE:
				create(para);
				break;
			case Constant.VALIDATE:
				validate(para);
				break;
			case Constant.ACTIVATE:
				activate(para);
				break;
			case Constant.RESET_SC:
				resetSecurityCode(para);
				break;
		}
	}
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