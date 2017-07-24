import {AppUtil} from 'util/AppUtil';
import {AwsIotUtil} from 'util/AwsIotUtil';
import {Constant} from  'util/Constant';
import {DataManager} from 'dataManager/DataManager'
import {EntityManager}from 'entity/EntityManager'

class MessageHandler{
    static process(topic, payload){
        console.log('~~~~~message received~~~');
        console.log('topic:',topic);
        console.log('data:',payload);

        let appId=AppUtil.getLevelNTopic(topic, Constant.APP_ID_IDX);
        let entity =AppUtil.getLevelNTopic(topic, Constant.ENTITY_IDX);
        let func =AppUtil.getLevelNTopic(topic, Constant.FUNC_IDX);
        let msgType =AppUtil.getLevelNTopic(topic, Constant.MESSAGE_TYPE);

        let para=payload;
        para.companyId=Constant.COMPANY_ID;

        if(msgType==Constant.RETURN){
            let resTopic=AppUtil.makeTopic([Constant.COMPANY_ID, Constant.OUT, appId, entity, func]);
            para.resTopic=resTopic;
        }

        //work out data request from entity
        let dataReqs = EntityManager.callEntityFunc(entity, func, para);
        // console.log('~~data reqs~~~',dataReqs);

        //process data request
        dataReqs.forEach(r=>{
            DataManager.processDataReq(r);
        });
    }
}

export {MessageHandler}