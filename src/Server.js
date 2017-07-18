/***
 * subscribe to company message
 * run query and publish query res to aws iot
 */
import {MessageHandler} from 'util/MessageHandler';
import {AwsIotUtil} from 'util/AwsIotUtil';
import {Constant} from  'util/Constant';
import {DataManager} from 'dataManager/DataManager'
import {EntityManager}from 'entity/EntityManager'

console.log('~~~~starting server~~~~~~~~~~');

AwsIotUtil.init(MessageHandler.process);