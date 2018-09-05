
import {
  prototypes,
  GlConst,
  directives,
  GlAxios,
  GlValidate
} from '@/lib'
import * as GlCommon from '@/common'
import { SetCommonConfig } from '@/lib/prototypes'
const GlsxVueCommon = {}

GlsxVueCommon.install = function(Vue, opts = {}) {
  SetCommonConfig(opts)
  Vue.use(prototypes)
  Vue.use(directives)
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  GlsxVueCommon.install(window.Vue)
}
export {
  GlsxVueCommon,
  GlAxios,
  GlConst,
  GlValidate,
  GlCommon
}
export default GlsxVueCommon
