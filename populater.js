'use strict';

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


module.exports = async function(models, mongoose){
  for(let i in models){
    const Model = mongoose.model(i);
    const instances = models[i];
    for(let j in instances){
      await save(Model, instances[j]);
    }
  }
}
