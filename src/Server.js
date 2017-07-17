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

    para.ticketNo=AppUtil.makeTopic([Constant.OUT,appId,entity,func]);
    para.entity=entity;
    para.func=func;

    let requests = EntityManager.callEntityFunc(entity, func, para);
    // console.log(requests);

    requests.forEach(r=>{
        DataManager.process(r);
    });
}

function runQuery() {

}

AwsIotUtil.init(msgCallback);

// msgCallback('f4035320-be1f-4e71-8005-2363a6f074ee/in/a383490d6831193e0f691d755f990366bcda5f3ed4317d7e9343e2613a262748/user/verify',{"securityCode":"333"});
