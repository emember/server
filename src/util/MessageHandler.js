import {AppUtil} from 'util/AppUtil';
import {AwsIotUtil} from 'util/AwsIotUtil';
import {Constant} from  'util/Constant';
import {DataManager} from 'dataManager/DataManager'
import {EntityManager}from 'handler/HandlerManager'

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

        if(msgType==Constant.RETURN){
            let resTopic=AppUtil.makeTopic([Constant.OUT, appId, entity, func]);
            para.resTopic=resTopic;
        }

        //work out data request from handler
        EntityManager.callFunc(entity, func, para);
    }
}

export {MessageHandler}