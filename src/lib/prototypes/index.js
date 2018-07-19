import prototypes from './src/prototypes'
import {
  SetConfig,
  GetConfig,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
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
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveConfig
}
