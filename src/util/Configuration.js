import nconf from "nconf";

let instance=null;

class Configuration
{
	constructor(){
		if(!instance){
			nconf.use('file',{file:'config.json'});
			instance=nconf.get();
		}

		return instance;
	}
}

export {Configuration};