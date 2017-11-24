'use strict';

const queries = {
  findOne(Model, params){
		return Model.findOne(params)
			.then((instance)=>{
        if (!instance) throw new Error(`${Model.modelName}: ${JSON.stringify(params)} no encontrado`);
				return instance._id;
			});
  }
};

function save(Model, instance){
  return new Model(instance)
    .save()
    .then((m)=>{
      console.log('\x1b[37m%s\x1b[32m%s\x1b[0m', '-- ','saved', '---------');
      console.log(m);
      console.log('----------------------------------');
      return m;
    });
};

function config(hooksConfig = [], mongoose) {

  return hooksConfig.map( (config)=>{

    const Model = mongoose.model(config.model);
    const queryMethod = queries[config.queryMethod];

    return async function(instance){ //hook
      const references = instance[config.from];

      instance[config.setIn] = await Promise.all( references.map(
          reference => queryMethod( Model, {[config.query]: reference})
        )
      );
      return instance;
    };
  });
};

module.exports = async function(models, mongoose){

  for(let i in models){
    const Model = mongoose.model(i);
    const instances = models[i].instances;
    const hooks = config(models[i].config, mongoose);

    for(let j in instances){
      let instance = instances[j];

      for(let h in hooks) await hooks[h](instance);

      await save(Model, instance);
    }
  }
}
