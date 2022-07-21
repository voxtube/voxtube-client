import Vue from 'vue'
import { upperFirst } from 'lodash-es'

export default Vue.filter('sentenceCase', function (value) {
  if (!value) return ''
  // value = value.toString()
  return upperFirst(value)
  // return value.charAt(0).toUpperCase() + value.slice(1)
})
