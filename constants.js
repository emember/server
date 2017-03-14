/**system**/
const DEBUG=true;
const COMPANY_ID ='f4035320-be1f-4e71-8005-2363a6f074ee';
const ENTITY_IDX=1;
const ACTION_IDX=2;

/** entities **/
const MEMBER='member';


/** actions **/
const CREATE ='create';
const UPDATE ='update';
const DETAIL ='detail';
const VALIDATE ='validate';
const ACTIVATE ='activate';


/** topics **/
const TOPIC_COMPANY_ID ='f4035320-be1f-4e71-8005-2363a6f074ee/';
const FILE ='file/';
const DATABASE ='database/';




const MEMBER_CREATE ='member/create/';
const MEMBER_INFO='member/info/';
const MEMBER_UPDATE ='member/update/';
const MEMBER_FIND='member/find/';

const COMPANY_DETAIL = 'company/detail/';
const COMPANY_SAVE = 'company/save/';
const VISIT_ADD ='visit/add/';

module.exports={
	DEBUG:DEBUG,
	COMPANY_ID :COMPANY_ID,
	ENTITY_IDX:ENTITY_IDX,
	ACTION_IDX:ACTION_IDX,

	CREATE:CREATE,
	UPDATE:UPDATE,
	DETAIL:DETAIL,
	VALIDATE:VALIDATE,
	ACTIVATE:ACTIVATE,

	TOPIC_COMPANY_ID:TOPIC_COMPANY_ID,
	FILE:FILE,
	DATABASE:DATABASE
}