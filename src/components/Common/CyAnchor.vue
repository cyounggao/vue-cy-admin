<template>
  <div class="anchor clearfix" ref="anchor">
    <ul class="anchor__nav card">
      <li
        v-for="(item, key) in anchorNavData"
        :key="key"
        :class="{ active: value === key, disabled: item.disabled }"
        @click="arrive(key, item)"
      >
        <i v-if="item.icon" :class="item.icon"></i>
        <span class="ellipsis" :title="item.label">{{ item.label }}</span>
      </li>
    </ul>
    <div class="anchor__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import { getScrollContainer } from '@/utils/dom'
export default {
  name: 'Anchor',
  props: {
    // 当前楼层
    value: {
      type: String,
      default: ''
    },
    // 滚动的元素，不传默认取离元素最近的可以滚动的元素
    scrollDom: {
      type: String,
      default: ''
    },
    //固定（position: fixed）在滚动区域类的高度
    fixedHeight: {
      type: Number,
      default: 54
    }
  },
  data() {
    return {
      anchorNavData: {}, //电梯楼层高度的映射
      scrollFunDebounceFun: utils.vueDebounce('scrollFun', 100),
      valueType: 1, //当前楼层改变的类型，1是组件传递、按钮直达改变，2是通过滚动监听自动改变
      children: []
    }
  },
  computed: {
    scrollWrap() {
      if (this.scrollDom) {
        return document.querySelector(this.scrollDom)
      } else {
        return getScrollContainer(this.$refs.anchor, true)
      }
    }
  },
  watch: {
    // 监听楼层变化，当为父组件传递，或者按钮直达时，手动滚动到当前楼层
    value(val) {
      if (this.valueType === 1) {
        const scrollTop = this.getAnchorItemInfo(
          this.anchorNavData[val]?.dom
        ).scrollTop
        this.scrollElement(scrollTop)
      } else {
        this.valueType = 1
      }
    }
  },
  mounted() {
    this.calcChildren()
    this.init()
    let scrollTop = 0
    if (this.anchorNavData[this.value]) {
      scrollTop = this.getAnchorItemInfo(
        this.anchorNavData[this.value].dom
      ).scrollTop
      this.scrollElement(scrollTop)
    } else {
      scrollTop = this.getScrollTop(this.scrollWrap)
      this.getAnchorValue(scrollTop)
    }
    this.scrollWrap.addEventListener('scroll', this.scrollFunDebounce)
  },
  beforeDestroy() {
    this.scrollWrap.removeEventListener('scroll', this.scrollFunDebounce)
  },
  methods: {
    calcChildren() {
      let children = this.$slots.default.map((item) => item.componentInstance)
      this.children = treeDeep(children)
      function treeDeep(data, res = []) {
        data.forEach((item) => {
          if (item.$vnode.tag.indexOf('AnchorItem') > -1) {
            res.push(item)
          } else {
            item.$children &&
              item.$children.length &&
              treeDeep(item.$children, res)
          }
        })
        return res
      }
    },
    // 初始化，获取电梯按钮数据，获取楼层高度映射
    init() {
      this.children.forEach((item) => {
        this.$set(this.anchorNavData, item.name, {
          dom: item.$el,
          label: item.label,
          icon: item.icon,
          disabled: item.disabled
        })
      })
    },
    /**
     *
     * @param {Dom} e
     * @description 获取元素的scrollTop
     */
    getScrollTop(e) {
      if (e.scrollTop !== undefined) {
        return e.scrollTop
      } else if (e.document) {
        return (
          e.document.documentElement.scrollTop ||
          window.pageYOffset ||
          e.document.body.scrollTop ||
          0
        )
      }
      return e.documentElement.scrollTop || e.body.scrollTop || 0
    },
    // 获取AnchorItem dom 的scrollTop,bottom,height
    getAnchorItemInfo(dom) {
      if (!dom) {
        return {}
      }
      const scrollTop = this.getScrollTop(this.scrollWrap)
      const rect = dom.getBoundingClientRect()
      return {
        scrollTop: rect.top - this.fixedHeight + scrollTop,
        bottom: rect.bottom - this.fixedHeight + scrollTop,
        height: rect.height
      }
    },

    //滚动的处理函数
    scrollFun(e) {
      const scrollTop = this.getScrollTop(e.target)
      this.getAnchorValue(scrollTop)
    },
    // 函数防抖
    scrollFunDebounce(e) {
      this.scrollFunDebounceFun(e)
    },
    // 根据当前高度获取楼层位置，通过计算每个元素在可视区域的高度，与自身实际高度的占比（全部都不在可视区域为0，全部都在则为1），判断当前处在那个楼层
    getAnchorValue(scrollTop) {
      let obj = {}
      for (let i = 0; i < this.children.length; i++) {
        const item = this.getAnchorItemInfo(this.children[i].$el)
        const scrollWrapHeight = this.scrollWrap.getBoundingClientRect
          ? this.scrollWrap.getBoundingClientRect().height
          : this.scrollWrap.innerHeight
        const height = scrollWrapHeight + scrollTop - this.fixedHeight
        let value = 0
        if (scrollTop <= item.scrollTop) {
          value = height - item.scrollTop
          value = value > item.height ? item.height : value < 0 ? 0 : value
        } else if (scrollTop > item.scrollTop && scrollTop <= item.bottom) {
          value = item.bottom - scrollTop
        }
        value = value / item.height
        if (obj[value] === undefined) {
          obj[value] = [this.children[i].name]
        } else {
          obj[value].push(this.children[i].name)
        }
      }
      const maxKey = Math.max(...Object.keys(obj))
      this.valueType = 2
      // 如果占比相同,则取第一个 后期可以修改下 向下滚动取第一个,向上滚动取最后一个
      this.$emit('input', obj[maxKey][0])
    },
    //直达楼层
    arrive(name, item) {
      if (name === this.value || item.disabled) {
        return
      }
      this.valueType = 1
      this.$emit('input', name)
    },
    // 模拟滚动
    scrollElement(itemScrollTop) {
      const scrollTop = this.getScrollTop(this.scrollWrap)
      this.scrollAnimation(this.scrollWrap, scrollTop, itemScrollTop)
    },
    /**
     *
     * @param {Dom} el 要滚动的元素
     * @param {Number} start 滚动元素的初始位置
     * @param {Number} end 滚动元素的初始位置
     * @description 滚动动画
     */
    scrollAnimation(el, start, end) {
      let step = 0
      // 根据距离计算步长，表现在先快后慢
      const interval = Math.abs(end - start)
      if (interval > 1000) {
        step = 100
      } else if (interval > 500) {
        step = 50
      } else if (interval > 200) {
        step = 30
      } else {
        step = 20
      }
      if (start < end) {
        start = start + step
        if (start > end) {
          start = end
        }
      }
      if (start > end) {
        start = start - step
        if (start < end) {
          start = end
        }
      }
      el.scrollTo(0, start)
      if (start !== end) {
        requestAnimationFrame(() => {
          this.scrollAnimation(el, start, end)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.anchor__nav.card {
  position: sticky;
  top: $headerHeight;
  z-index: 10;
  float: left;
  width: 200px;
  padding: 15px 20px;

  li {
    line-height: 20px;
    height: 20px;
    width: fit-content;
    user-select: none;
    margin: 20px 0;
    cursor: pointer;
    &:hover {
      color: $mainColor;
    }
    &.active {
      color: $mainColor;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    i {
      margin-right: 6px;
      vertical-align: top;
    }
    span {
      display: inline-block;
      max-width: 140px;
    }
  }
}
.anchor__content {
  float: right;
  width: calc(100% - 220px);
}
</style>