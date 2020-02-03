//$export NODE_RIND=true  (will rebuild all mongoose indexes)
let node_rind = false;
if (process.env.NODE_RIND) {
  node_rind = JSON.parse(process.env.NODE_RIND);
}


const config = {
  name: 'stage',
  server: {
    port: process.env.PORT || 8002
  },
  mongodb: {
    enabled: true,
    uri: process.env.MONGODB_URI || 'mongodb://common_user:12345@5.189.161.70:27017/simple-crawler',
    driver: 'mongoose',
    rebuildIndexes: node_rind
  }
};

module.exports = config;
