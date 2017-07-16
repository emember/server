'use strict'

import {Configuration} from "src/util/Configuration";
import {LogFactory} from "src/util/LogFactory";

import Kafka from 'node-rdkafka';


let consumer =null;
let logger = null;
let config=null;

class KafkaConsumer{

	static init(topics, onMsg){
		config=new Configuration();
		logger = LogFactory.getLogger();

        logger.info('Initialising Kafka consumer');

		consumer = new Kafka.KafkaConsumer(
			{
				'group.id':'kafka.consumer.vdm'
				,'bootstrap.servers':config.kafkaBrokerList
				,'enable.auto.offset.store':true
				,'offset.store.method':'broker'
                ,'enable.auto.commit':'false'
                // ,'offset_commit_cb':function (err, topicParitions){
					// console.logs('~~commmit cb~~');
					// console.logs(err?err:topicParitions);
            	// }
			}
			,{
				'auto.offset.reset':'smallest'
				// ,"offset.store.method":"broker"
			}
		);

		consumer.on('event.err',function(err){
			logger.info('Error from Kafka consumer',err);
		});


		function processRecords(msgs){
            if(msgs.length>0){
                logger.info('Process batch, size: ',msgs.length);
                let ids=[];
                for (var i =0;i<msgs.length;i++){
                    ids.push(msgs[i].value.toString());
                }

                onMsg(ids).then(()=>{
                    for (var i =0;i<msgs.length;i++){
                        logger.info('Commit offset:'+msgs[i].offset);
                        consumer.commitMessage(msgs[i]);
                    }
                    fetchBatch(config.ackBatchSize);
                });
			}else{
                fetchBatch(config.ackBatchSize);
			}
        }

		function fetchBatch(batchSize){
            // logger.info('Fetch batch');
            consumer.consume(batchSize, function(err, data){
                if(err){
                    logger.info('Error on fetching msg batch', err);
                    return;
                }
                // logger.info('Fetching returned batch size', data.length);
                processRecords(data);
            });
        }


		consumer.on('ready', function(arg){
			logger.info('Kafka consumer is ready '+JSON.stringify(arg));
            consumer.subscribe(topics);
            // consumer.consume();
            fetchBatch(config.ackBatchSize);

        });

        consumer.on('data',data=>{
        	// console.logs(data);
        	// console.logs(data.value.toString());
        })


        consumer.on('disconnect',function(arg){
			logger.info('Kafka consumer disconnected '+ JSON.stringify(arg));
		})

		consumer.connect({},function(err){
			if (err) {
                logger.info('Error from Kafka consumer when connecting '+ JSON.stringify(err));
				return process.exit(1);
			}
            logger.info('Consumer has connected to Kakfa cluster.');
		});
	}

		// console.logs('~~~',consumer);


        // consumer.on('data',data=>{
        //     logger.info('Kafka consumer received data:', data);
        //     // onData(data).then(()=>{
        //     	// consumer.commit();
			// // });
        // })
}

export {KafkaConsumer}