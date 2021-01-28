import Vue from 'vue'
import Vant from 'vant'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// import 'utils/initFastClick'
// import 'utils/permission'
// import SvgIcon from 'components/SvgIcon'
// import '@/icons' // icon
// import '@/style/reset.less' // 常用样式
// import '@/style/common.scss'
import 'vant/lib/index.less'// 全局引入Vant 样式
import '@/style/vant_variable.less'
import VConsole from 'vconsole'
import defaultSettings from '@/settings'
// import * as filters from '@/filters'
import global_ from 'components/Global.vue'
// import { Toast } from 'vant'
// import * as directives from '@/directives'
// import { Lazyload } from 'vant'
// import { permissionDetail, checkRouteIsNull } from '@/utils'
// import * as Sentry from '@sentry/browser'
// import { Integrations } from '@sentry/tracing'

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_

Vue.use(Vant)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
