/* eslint-disable */
import axios from 'axios'


export default function plugin(Vue, pluginConfig) {
  if (plugin.installed) { return }
  Vue.$api = axios.create({
    baseURL: process.env.VUE_APP_API,
  })

  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return Vue.$api
      }
    }
  })
}
