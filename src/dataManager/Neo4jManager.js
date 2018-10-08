import neo4j from 'node-neo4j';

const db = new neo4j('http://ec2-18-222-36-23388.us-east-2.compute.amazonaws.com','Authorization:Basic bmVvNGo6THliMzMwMDEx');

class Neo4jManager{
    static async runQuery(query, para){
        console.log('~~~~neo4j run query~~~~',query);
        let result = await cypherQueryAsync(query, para);
        return result;
    }
}


function cypherQueryAsync(query, para) {
    return new Promise((resolve, reject)=>{
        const callback =(error,value)=>error?reject(error):resolve(value);
        db.cypherQuery(query, para, callback);
    });
}


export {Neo4jManager}