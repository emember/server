import neo4j from 'node-neo4j';

const db = new neo4j('http://ec2-18-222-36-233.us-east-2.compute.amazonaws.com','Authorization:Basic bmVvNGo6THliMzMwMDEx');

class Neo4jManager{
    static async runQuery(query, para){
        try{
            let result = await cypherQueryAsync(query, para);
            return result.data;
        }catch (e) {
            throw Error(e);
        }
    }
}


function cypherQueryAsync(query, para) {
    return new Promise((resolve, reject)=>{
        const callback =(error,value)=>error?reject(error):resolve(value);
        db.cypherQuery(query, para, callback);
    });
}


export {Neo4jManager}