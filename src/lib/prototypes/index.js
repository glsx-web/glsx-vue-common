import prototypes from './src/prototypes'
import {
  SetConfig,
  GetConfig,
  GetToken,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveToken,
  RemoveConfig
} from './src/prototypes'
export default {
  install(Vue) {
    Vue.use(prototypes)
  }
}
export {
  prototypes,
  SetConfig,
  GetConfig,
  GetToken,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveToken,
  RemoveConfig
}
