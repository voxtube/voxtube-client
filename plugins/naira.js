import Vue from 'vue'

export default Vue.filter('naira', function (value) {
  // if (!value) return ''
  // value = value.toString()
  return `₦${value}`
})
