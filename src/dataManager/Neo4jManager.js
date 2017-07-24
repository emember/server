import neo4j from 'node-neo4j';
import {AwsIotUtil} from 'util/AwsIotUtil';

const db = new neo4j('http://35.164.176.15:443','Authorization:Basic bmVvNGo6THliMzMwMDExIQ==');

function sendResponse(topic, result) {
    console.log('neo4j cb topic~~',topic);
    console.log('neo4j cb msg~~',result);

    AwsIotUtil.publish(topic, result);
}


class Neo4jManager{
    static process(req, cb){
        console.log('~~~~neo4j run query~~~~',req);
        db.cypherQuery(
            req.query,
            req.para,
            function (err, result) {
                if(req.resTopic){
                    sendResponse(req.resTopic, {error:err, result:result?result.data:null});
                }
            });
    }
}

export {Neo4jManager}