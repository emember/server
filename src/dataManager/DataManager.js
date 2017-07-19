import {Constant} from 'util/Constant';
import {Neo4jManager} from './Neo4jManager';
import {S3Manager} from './S3Manager';
import {AwsIotUtil} from 'util/AwsIotUtil';
import {AppUtil} from 'util/AppUtil';


function sendResponse(topic, result) {
    console.log('dm cb topic~~',topic);
    console.log('dm cb msg',result);

    // AwsIotUtil.publish(topic, result);
}

class DataManager{
    static processDataReq(req){
        let manager=AppUtil.getLevelNTopic(req.topic,1);
        console.log('~~~~~~~~~dm called~~~~~~~~~~', manager);
        switch (manager){
            case Constant.NEO4J:
                Neo4jManager.process(req.payload, sendResponse);
                break;
            case Constant.S3:
                S3Manager.process(req.payload);
                break;
        }
    }
}


export {DataManager}