import http from 'http';
import {HandlerManager} from "./handler/HandlerManager";

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
        let apiCallPara = JSON.parse(body);
        HandlerManager.callFunc(apiCallPara)
            .then(function (data) {
                callback(null,data);
            })
            .catch(function (err) {
                callback(err,null);
            });
   });
}).listen(8080);