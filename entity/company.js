function execute(action, para){
	switch(action){
		case constants.DETAIL:
			detail(para);
			break;
	}
}

function detail(para){
	para.companyId=constants.COMPANY_ID;
	var query='MATCH (n:company) where n.companyId={companyId} RETURN n';
	mqttClientData.publish(constants.DATABASE, JSON.stringify({query:query, para:para}));
}

module.exports = {
	execute:execute
};


// router.post('/save',function(req, res, next) {
// 	var query="match (n:company) where n.company_id={company_id}  \
// 			   set n.name={name}, n.phone={phone}, n.address={address}, n.abn={abn}";
// 	db.cypherQuery(
// 	query,
// 	req.para,
// 	function (err, result) {
// 		if (err) {
// 			return console.log(err);
// 		}	  
// 		res.json(result.data);
// 	});		
// })