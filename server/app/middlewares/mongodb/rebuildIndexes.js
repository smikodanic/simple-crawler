const chalk = require('chalk');

/**
 * Rebuild indexes for one model (collection)
 * @param  {Object} modelName - for example: usersModel
 */
module.exports.oneModel = (modelName) => {
  modelName.collection.dropIndexesAsync().then(() => modelName.createIndexesAsync());
};



/**
 * Rebuild indexes for all models (collections)
 */
module.exports.allModels = () => {
  const mongoose = require('mongoose');

  console.log(chalk.blue('NODE_RIND=true - Mongo indexes rebuild for: ', mongoose.modelNames()));

  const modelsArr = mongoose.modelNames();
  /*
    [
        'usersMD',
        'settingsMD',
        'plansMD',
        'dbmoDatabasesMD',
        'dbmoCollectionsMD',
        'dbmoEndpointsMD',
        'dbmoEndpointsAvailableMD',
        'emailServersMD',
        'emailEndpointsAvailableMD',
        'emailEndpointsMD',
        'authGroupsMD',
        'authUsersMD',
        'authEndpointsAvailableMD',
        'authEndpointsMD'
    ]
     */

  modelsArr.forEach(mdl => {
    mongoose.model(mdl).collection.dropIndexesAsync().then(() => mongoose.model(mdl).createIndexesAsync());
  });


};
