import {Constant} from 'util/Constant';
import {Neo4jManager} from './Neo4jManager';
import {S3Manager} from './S3Manager';
import {AppUtil} from 'util/AppUtil';

class DataManager{
    static processDataReq(req){
        let manager=AppUtil.getLevelNTopic(req.topic,1);
        console.log('~~~~~~~~~dm called~~~~~~~~~~', manager);
        switch (manager){
            case Constant.NEO4J:
                Neo4jManager.process(req.payload);
                break;
            case Constant.S3:
                S3Manager.process(req.payload);
                break;
        }
    }
}


export {DataManager}