import CyCell from './CyCell'
import CyImage from './CyImage'
import CyTable from './CyTable'
import CyText from './CyText'
import CyAnchor from './CyAnchor'
import CyAnchorItem from './CyAnchorItem'
import CyDatePicker from './CyDatePicker'
import CyLoading from './CyLoading'
const component = {
    install: function(Vue){
        Vue.component('CyCell',CyCell)
        Vue.component('CyImage',CyImage)
        Vue.component('CyTable',CyTable)
        Vue.component('CyText',CyText)
        Vue.component('CyAnchor',CyAnchor)
        Vue.component('CyAnchorItem',CyAnchorItem)
        Vue.component('CyDatePicker',CyDatePicker)
        Vue.component('CyLoading',CyLoading)
    }
}
export default component