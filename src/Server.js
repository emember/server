/***
 * subscribe to company message
 * run query and publish query res to aws iot
 */
import {AppUtil} from 'util/AppUtil';
import {AwsIotUtil} from 'util/AwsIotUtil';
import {Constant} from  'util/Constant';
import {DataManager} from 'dataManager/DataManager'
import {EntityManager}from 'entity/EntityManager'

console.log('~~~~starting server~~~~~~~~~~');

function  msgCallback(topic, payload) {
    let appId=AppUtil.getLevelNTopic(topic, Constant.APP_ID_IDX);
	let entity =AppUtil.getLevelNTopic(topic, Constant.ENTITY_IDX);
    let func =AppUtil.getLevelNTopic(topic, Constant.FUNC_IDX);

	let para=payload;
    para.companyId=Constant.COMPANY_ID;

    let ticketNo=AppUtil.makeTopic([Constant.COMPANY_ID, Constant.OUT, appId, entity,func]);
    para.ticketNo=ticketNo;

    let dataReqs = EntityManager.callEntityFunc(entity, func, para);
    // console.log(requests);

    dataReqs.forEach(r=>{
        DataManager.process(r);
    });
}

AwsIotUtil.init(msgCallback);

// msgCallback('f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/verify',{"securityCode":"333"});
// msgCallback('f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/login',{"email":"a@b.com","pin":"1234"});
// msgCallback('f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/sendSecurityCode',{"email":"a@b.com"});
