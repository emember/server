import neo4j from 'node-neo4j';
import {AwsIotUtil} from '../util/AwsIotUtil';

const db = new neo4j('http://ec2-18-222-36-233.us-east-2.compute.amazonaws.com','Authorization:Basic bmVvNGo6THliMzMwMDEx');

function sendResponse(topic, result) {
    console.log('neo4j cb topic~~',topic);
    console.log('neo4j cb msg~~',result);

    AwsIotUtil.publish(topic, result);
}


class Neo4jManager{
    static process(query, para, cb){
        console.log('~~~~neo4j run query~~~~',query);
        db.cypherQuery(
            query,
            para,
            function (err, result) {
                if(para.resTopic){
                    sendResponse(para.resTopic, {err:err, data:result?result.data:null});
                }
                console.log('~~~~neo4j query result~~~~',{err:err, data:result?result.data:null});
                cb(err,result?result.data:null);
            });
    }
}

export {Neo4jManager}