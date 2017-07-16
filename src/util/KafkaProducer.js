'use strict'

import {Configuration} from "src/util/Configuration";
import {LogFactory} from "src/util/LogFactory";

import Kafka from 'node-rdkafka';


let producer =null;
let logger = null;
let config=null;

class KafkaProducer{	
	
	static init(onDelivered){
		config=new Configuration();
		logger = LogFactory.getLogger();

        logger.info('Initialising Kafka producer');


		producer = new Kafka.Producer({
			'metadata.broker.list':config.kafkaBrokerList,
			'dr_cb':true,
			'event_cb':true
		});		

		producer.setPollInterval(100);

		producer.on('delivery-report',function(err,report){
			if(err){
				report.err=err;
				logger.error('Msg deliver Failed :', JSON.stringify(report));	
			}else{
				logger.info('Msg delivered :', JSON.stringify(report));
				onDelivered(report.key);
			}
		});

		producer.on('ready',function(arg){
			logger.info('Producer is ready.',arg);
		});

		producer.on('error',function(error){
			logger.error('Error from producer', error);
		});	

		producer.on('event.error',function(error){
			logger.error('Error from producer', error);
		});	


		producer.on('disconnected', function(arg){
			logger.info('Producer disconnected '+ JSON.stringify(arg));
		})


		producer.connect({},function(err){
			if (err) {
				logger.error('Failed to connect to Kafka cluster',err);
				return process.exit(1);
			}
			logger.info('Producer has connected to Kakfa cluster.');
		});	
	}

	static produce(msg){
		try{
			//check if connection is live
			logger.info('Publishing msg to Kafka, key: '+msg.key);

			let topic = producer.Topic(msg.topic, {'request.required.acks':1});

			producer.produce(
				topic,
				null,
				msg.data,
				msg.key
			);
		}catch(e){
			logger.info('Error on producing msg, key: '+msg.key, e);
		}
	}
}

export {KafkaProducer};