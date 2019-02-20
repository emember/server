import http from 'http';
import {HandlerManager} from "./handler/postgre/HandlerManager";


http.createServer((req, res)=>{
    const callback=(err, result)=>{
        if (err) {
            res.writeHead(400, {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(err));
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
        if(req.method==='OPTIONS') {
            callback(null,null);
            return;
        }

        let apiCallReq;
        try {
            apiCallReq = JSON.parse(body);

        }catch (e) {
            callback(Error('Invalid request body'),null);
            return;
        }

        HandlerManager.callFunc(apiCallReq)
            .then(function (data) {
                callback(null,data);
            })
            .catch(function (err) {
                console.error(err);
                callback(Error('Error occurred when processing request'),null);
            });
   });
}).listen(8080);