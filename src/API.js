import http from 'http';
import {EntityManager} from "./entity/EntityManager"

http.createServer((req, res)=>{
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    });

    const callback=(err, result)=>{
        if (err) {
            res.writeHead(400, {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({err:err.message}));
        }else{
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    }

    let body='';
    req.on('data', (chunk)=>{
        body+=chunk;
    });

    req.on('end',()=>{
        try{
            let para = JSON.parse(body);

            EntityManager.callEntityFunc(para.entity, para.func, para, callback);

        }catch(err){
            res.statusCode = 400;
            res.end(err.message);
        }
    });
}).listen(8000);