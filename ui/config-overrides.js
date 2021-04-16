const WorkerPlugin = require('worker-plugin');

module.exports = function override(config, env) {
  config.plugins = [
    ...config.plugins,
    ...[
      new WorkerPlugin({
        reserveTypeModule: true,
        // workerType: 'text/javascript'
      })
    ]
  ]
  return config;
}