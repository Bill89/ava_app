import Vue from 'vue'
import VScroll from './VScroll'
import Tabs from './Tabs'
import SectionBox from './SectionBox'
import Countdown from './Countdown'
import SwiperCard from './SwiperCard'
import AvaDialog from './AvaDialog'
import ChildLayout from '@/layouts/ChildLayout'
import FixedHead from '@/layouts/FixedHead'
import FixedFoot from '@/layouts/FixedFoot'
import { Lazyload, Swipe, SwipeItem, Button, Icon, Search, Progress, Grid, GridItem, Cell, CellGroup, Field } from 'vant'

Vue.use(Lazyload)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Progress)
Vue.use(Grid).use(GridItem)
Vue.use(Cell).use(CellGroup)
Vue.use(Field)

Vue.prototype.avaDialog = AvaDialog

const CommonUi = {
  install: function(Vue) {
    Vue.component('VScroll', { extends: VScroll })
    Vue.component('VTabs', { extends: Tabs })
    Vue.component('SectionBox', { extends: SectionBox })
    Vue.component('Countdown', { extends: Countdown })
    Vue.component('SwiperCard', { extends: SwiperCard })
    Vue.component('ChildLayout', { extends: ChildLayout })
    Vue.component('FixedHead', { extends: FixedHead })
    Vue.component('FixedFoot', { extends: FixedFoot })
  }
}
export default CommonUi
