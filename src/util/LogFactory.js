"use strict";

import winston from "winston";
import {Configuration} from "util/Configuration";


class LogFactory {

    static getLogger() {
        let config= new  Configuration();
        
        return new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    name: 'server.log',
                    filename: config.logFile,
                    level: config.logLevel
                })
            ]
        });
    }

}

export {LogFactory};
