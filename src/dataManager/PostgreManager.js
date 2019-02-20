import {Pool} from 'pg';

const pool = new  Pool({
    user:'emember_admin',
    password:'Lyb330011',
    host:'emember-postgre-svr.cnl5qbc1axl9.us-east-2.rds-preview.amazonaws.com',
    port:5432,
    database:'emember_db',
});

class PostgreManager{
    static async callFunc(func, para= {}){
        console.log(func,'~~~~~',para);
        try{
            let result = await pool.query('select '+func+ '(\''+JSON.stringify(para)+'\'::json)');
            console.log(func,'~~~result~~',result);
            return result.rows[0][Object.keys(result.rows[0])[0]];
        }catch (e) {
            throw Error(e);
        }
    }
}

export {PostgreManager}