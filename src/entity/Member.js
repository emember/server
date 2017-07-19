import {Constant} from 'util/Constant';
import {AppUtil} from 'util/AppUtil';

class Member{
	execute(action, para){
        let dataReqs=[];
		switch(action){
			case Constant.CREATE:
                dataReqs=create(para);
				break;
		}
		return dataReqs;
	}
}

function create(para){
	var qrPicFilename=para.qrCode+"_qr.jpg";

	var files =[
		{filename:para.companyId+'/'+qrPicFilename,data:para.qrPic}
	];

	var profilePicFilename=null;
	if(para.profilePic){
        var profilePicFilename=para.qrCode+"_profile.jpg";
	    files.push({filename:para.companyId+'/'+profilePicFilename,data:para.profilePic});
    }

    para.qrPic=qrPicFilename;
    para.profilePic=profilePicFilename;

	var query="match (c:company {companyId:{companyId}}) \
				merge (a:emAccount {email: {email}}) \
				merge (m:membership {qrCode:{qrCode}})\
				set m.qrPic={qrPic}, m.profilePic={profilePic}, m.firstname={firstname}, m.lastname={lastname}, m.phone={phone}, m.dateOfBirth={dateOfBirth}\
				merge (m)-[mcr:issuedBy ]->(c) \
				merge (m)-[mar:belongTo]->(a)";

    let dataReqs=[];
    dataReqs.push({
        topic:AppUtil.makeTopic([Constant.DATA_MANAGER,Constant.NEO4J]),
        payload:{
            resTopic:para.resTopic,
            query:query,
            para:para
        }
    });

    dataReqs.push({
        topic:AppUtil.makeTopic([Constant.DATA_MANAGER,Constant.S3]),
        payload:files
    });

    return dataReqs;

}

export {Member}


// router.post('/info', function(req, res, next) {
// 	var query='MATCH (m:member {qr_code:{qr_code}})  \
// 	optional match (m)-[r:has_visit]->(v:visit) \
// 	return {qr_code:m.qr_code, firstname:m.firstname, lastname:m.lastname, \
// 		profile_pic:m.profile_pic,\
// 		discount:m.discount, phone:m.phone, visit_count:count(v)}';

// 	db.cypherQuery(
// 	query,
// 	req.para,
// 	function (err, result) {
// 		if (err) {
// 			return console.logs(err);
// 		}	  
// 		console.logs(result.data[0]);
// 		res.json(result.data[0]);
// 	});	
// })


// router.post('/find', function(req, res, next) {
// 	var query='';
// 	if (req.para.find_by=='email') {
// 		query='MATCH (c:company {company_id:{company_id}})  \
// 					MATCH (e:email {email:{keyword}})	\
// 					MATCH (e)-[r1:is_member]-(m:member) \
// 					MATCH (c)-[r2:has_member]-(m) \
// 					optional match (m)-[r:has_visit]->(v:visit) \
// 		return {qr_code:m.qr_code, firstname:m.firstname, lastname:m.lastname, \
// 			profile_pic:m.profile_pic, \
// 			discount:m.discount, phone:m.phone, visit_count:count(v)}';

// 	}else if (req.para.find_by=='phone') {
// 		query='MATCH (c:company {company_id:{company_id}})  \
// 					MATCH (c)-[r:has_member]-(m:member {phone:{keyword}}) \
// 					optional match (m)-[r1:has_visit]->(v:visit) \
// 		return {qr_code:m.qr_code, firstname:m.firstname, lastname:m.lastname, \
// 			profile_pic:m.profile_pic,\
// 			discount:m.discount, phone:m.phone, visit_count:count(v)}';		
// 	}

// console.logs(query);

// 	db.cypherQuery(
// 	query,
// 	req.para,
// 	function (err, result) {
// 		if (err) {
// 			return console.logs(err);
// 		}	  
// 		res.json(result.data);
// 	});	
// })


// router.post('/create',function(req, res, next) {
// 	var para =req.para;

// 	var qr_pic_file=para.company_id+'/'+para.qr_code+"_qr.jpg";
// 	image.process(qr_pic_file, para.qr_pic);
// 	para.qr_pic=qr_pic_file;
	

// 	var profile_pic_file=para.company_id+'/'+ para.qr_code+"_profile.jpg";	
// 	image.process(profile_pic_file, para.profile_pic);
// 	para.profile_pic=profile_pic_file;

// 	var query="match (c:company {company_id:{company_id}}) \
// 				merge (e:email {email: {email}}) \
// 				merge (m:member {qr_code:{qr_code}})\
// 				set m.qr_pic={qr_pic}, m.profile_pic={profile_pic}, m.firstname={firstname}, m.lastname={lastname}, m.phone={phone}, m.date_of_birth={date_of_birth}\
// 				merge (c)-[cmr:has_member ]->(m) \
// 				merge (e)-[emr:is_member]->(m)";

// 	db.cypherQuery(
// 		query,
// 		para,
// 		function (err, result) {
// 			if (err) {
// 				return console.logs(err);
// 			}	  
// 			res.json(result.data);
// 	});		
// })

// router.post('/update',function(req, res, next) {
// 	var para =req.para;	

// 	if(para.update_profile=='1'){
// 		var profile_pic_file=para.company_id+'\\'+ para.qr_code+"_profile.jpg";	
// 		image.process(profile_pic_file, para.profile_pic);
// 		para.profile_pic=profile_pic_file;		
// 	}
	
// 	var query="merge (m:member {qr_code:{qr_code}})\
// 				set m.firstname={firstname}, m.lastname={lastname}, \
// 				m.profile_pic={profile_pic}, \
// 				m.phone={phone}, m.date_of_birth={date_of_birth}, m.discount={discount}";

// 	db.cypherQuery(
// 		query,
// 		para,
// 		function (err, result) {
// 			if (err) {
// 				return console.logs(err);
// 			}	  
// 			res.json(result.data);
// 	});		
// })



