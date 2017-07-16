'use strict'

import {Constant} from 'util/Constant';

class App{
    execute(action, para){
        switch(action){
            case Constant.ACTIVATE:
                activate(para);
                break;
            case Constant.RESET_SC:
                resetSecurityCode(para);
                break;
        }
    }
}

function activate() {


}