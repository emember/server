function execute(action, para){
	switch(action){
		case constant.VALIDATE:
			validate(para);
			break;
	}
}


function validate(para){
	util.log(para);

	para.companyId=constant.COMPANY_ID;
	var query="match (c:company {companyId:{companyId}}) \
				merge (e:email {email: {email}}) \
				merge (m:member {qrCode:{qrCode}})\
				set m.qrPic={qrPic}, m.profilePic={profilePic}, m.firstname={firstname}, m.lastname={lastname}, m.phone={phone}, m.dateOfBirth={dateOfBirth}\
				merge (c)-[cmr:hasMember ]->(m) \
				merge (e)-[emr:ownMember]->(m)";

	var dbTopic=constant.DATABASE;
	mqttClientData.publish(dbTopic, JSON.stringify({query:query, para:para}));		

}

module.exports = {
	execute:execute
};
