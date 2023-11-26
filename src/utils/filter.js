import Vue from 'vue'

Vue.filter('formatDate', value => {
  return value && new Date(value).toLocaleDateString().replaceAll('/','-')
})
