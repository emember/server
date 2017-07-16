'use strict'

import {Configuration} from 'src/util/Configuration';
import {LogFactory} from 'src/util/LogFactory';
import sql from 'mssql';

let logger = LogFactory.getLogger();
let config = new Configuration();
let pool;

class SqlHandler
{
	static async init(){
        pool= await sql.connect({
            user:config.sqlUsr,
            password:config.sqlPwd,
            server:config.sqlSvr,
            database:config.sqlDb
        });
	}

	static execute(query, params, callback){

		let sqlConfig={
			user:config.sqlUsr,
			password:config.sqlPwd,
			server:config.sqlSvr,
			database:config.sqlDb
		};

		const sqlConnPool=new sql.ConnectionPool(sqlConfig,err=>{
			err?logger.error('Error when running sql query',err):'';

			let request=sqlConnPool.request();

			if(params){
				params.forEach(p=>{
					if(p.type){
						request.input(p.name, p.type, p.value);		
					}else{
						request.input(p.name, p.value);	
					}					
				});				
			}

			request
			.execute(query, (err,result)=>{
				err?logger.error('Failed to run query:'+query+'\n',err):'';
				callback(err,result?result.recordset:null);
			});

		});
	}

    static async executePromise(query, params){
		try{
            let request=await pool.request();

            if(params){
                params.forEach(p=>{
                    if(p.type){
                        request.input(p.name, p.type, p.value);
                    }else{
                        request.input(p.name, p.value);
                    }
                });
            }

			let result= await request.execute(query);

            return result.recordset;

		}catch (err){
            logger.error(`Error when running sql query ${query}`,err);
		}
    }
}

export {SqlHandler};