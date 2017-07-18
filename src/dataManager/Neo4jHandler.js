import neo4j from 'node-neo4j';

const db = new neo4j('http://35.164.176.15:443','Authorization:Basic bmVvNGo6THliMzMwMDExIQ==');

class Neo4jHandler{
    static runQuery(req, cb){
        console.log('~~~~neo4j run query~~~~',req);
        db.cypherQuery(
            req.query,
            req.para,
            function (err, result) {
                cb(req.ticketNo, {error:err, result:result?result.data:null});
            });
    }
}

export {Neo4jHandler}