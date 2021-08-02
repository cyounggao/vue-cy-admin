import {
  MessageBox
} from 'element-ui'
export default {
  install(Vue) {
    /**
		 * 点击操作二次弹窗确认
		 * v-confirm="{title: '', fun: '', data: ''}"
		 * title: 弹窗的内容
		 * fun: 绑定的函数
		 * data: 函数传递的参数
		 */
    Vue.directive('confirm', function(el, binding) {
      const value = binding.value || {}
      const title = value.title || '您确定要进行该项操作吗？'
      el.onclick = function() {
        MessageBox.confirm(title, '提示', {
          type: 'warning'
        }).then(() => {
          value.data ? value.fun(value.data) : value.fun()
        }).catch(() => {

        })
      }
    })
  }
}
