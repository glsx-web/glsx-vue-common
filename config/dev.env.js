'use strict'
const merge = require('C:/Users/hhx/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.3.171:7300/mock/5b0ed7dbf189006180803286/standard"',
})
