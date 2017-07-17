import neo4j from 'node-neo4j';

const db = new neo4j('http://172.31.0.71:443','Authorization:Basic bmVvNGo6THliMzMwMDExIQ==');

class Neo4jHandler{
    static runQuery( req, cb){
        db.cypherQuery(
            req.query,
            req.para,
            function (err, result) {
                if (err) {
                    console.log(err);
                }else{
                    console.log(result.data);
                }
            });
    }
}

export {Neo4jHandler}