import neo4j from 'node-neo4j';
import {AwsIotUtil} from 'util/AwsIotUtil';

const db = new neo4j('http://35.164.176.15:443','Authorization:Basic bmVvNGo6THliMzMwMDExIQ==');

function sendResponse(topic, result) {
    console.log('neo4j cb topic~~',topic);
    console.log('neo4j cb msg~~',result);

    AwsIotUtil.publish(topic, result);
}


class Neo4jManager{
    static process(query, para){
        console.log('~~~~neo4j run query~~~~',query);
        db.cypherQuery(
            query,
            para,
            function (err, result) {
                if(para.resTopic){
                    sendResponse(para.resTopic, {err:err, data:result?result.data:null});
                }
            });
    }
}

export {Neo4jManager}