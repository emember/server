const {Pool} = require ('pg');

// const pool = new Pool({
//     user:'emember',
//     password:'Lyb330011',
//     host:'emember-db.cdgmwco5zuuy.us-east-2.rds.amazonaws.com',
//     port:5432,
//     database:'emember',
// });

const client = new Client({
    user:'emember',
    password:'Lyb330011',
    host:'emember-db.cdgmwco5zuuy.us-east-2.rds.amazonaws.com',
    port:5432,
    database:'emember',
});

(async ()=>{
    try{
        await  client.connect()

        let res = await  client.query('select user_account_attr from user_account');

        console.log(res.rows.map((r)=>{return r[Object.keys(r)[0]]}));

    }catch (e) {
        console.log(e);
    }

    process.exit(1);
})()
