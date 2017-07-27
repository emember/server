import {Constant} from 'util/Constant';
import {AppUtil} from 'util/AppUtil';
import {Neo4jManager} from 'dataManager/Neo4jManager';

class Visit{
    execute(action, para){
        switch(action){
            case Constant.CREATE:
                create(para);
                break;
            case Constant.INFO:
                info(para);
                break;
            case Constant.UPDATE:
                update(para);
                break;
        }
    }
}

function create(para) {
    var query="match (m:member {qrCode:{qrCode}}) \
				create (v:visit {expense:{expense}, discount:{discount}, payment:{payment}, datetime:{datetime}}) \
				create (m)-[r:hasVisit]->(v)";

    Neo4jManager.process(query, para);
}

export {Visit};
