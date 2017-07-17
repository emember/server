import {Constant} from 'util/Constant';
import {Neo4jHandler} from './Neo4jHandler';
import {AwsIotUtil} from 'util/AwsIotUtil';


function sendResponse(topic, result) {
    console.log('dm cb topic~~',topic);
    console.log('dm cb msg',result);

    AwsIotUtil.publish(topic, result);
}

class DataManager{
    static process(req){
        console.log('~~~~~~~~~dm called~~~~~~~~~~');
        switch (req.topic){
            case Constant.NEO4J:
                Neo4jHandler.runQuery(req.payload, sendResponse);
                break;
        }
    }
}


export {DataManager}