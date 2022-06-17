<template>
  <div class="cy-cell" :flex="`justify:between align:${align}`">
    <div class="cy-cell__left" :class="type" :style="leftStyle">
      <slot name="left">{{ label }}</slot>
    </div>
    <div class="cy-cell__right" :class="type" :style="rightStyle">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CyCell',
  props: {
    /**
     * left: 左边固定宽度，右边自适应
     * right: 右边固定宽度，左边自适应
     * between: 两端对齐
     */
    type: {
      type: String,
      default: 'left'
    },
    align: {
      type: String,
      default: 'stretch'
    },
    // 左边的内容，slot 名为 left
    label: {
      type: String,
      default: ''
    },
    // 固定宽度时具体的宽度，为0不设置
    width: {
      type: Number,
      default: 0
    },
    gap: {
      type: Number,
      default: 5
    },
    //右边的内容，默认插槽
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    leftStyle() {
      let style = {}
      if (this.type === 'left') {
        style.marginRight = this.gap + 'px'
        if (this.width) {
          style.width = this.width + 'px'
        }
      }
      return style
    },
    rightStyle() {
      let style = {}
      if (this.type === 'right') {
        style.marginLeft = this.gap + 'px'
        if (this.width) {
          style.width = this.width + 'px'
        }
      }
      return style
    }
  }
}
</script>

<style lang="scss">
.cy-cell {
  font-size: 14px;
  line-height: 24px;
  padding: 6px 0;

  .cy-cell__left {
    flex-shrink: 0;
    &.right {
      flex: 1;
      flex-shrink: 1;
      word-break: break-word;
    }
    &.between {
      flex-shrink: 1;
    }
  }

  .cy-cell__right {
    color: $fontColor6;
    flex-shrink: 0;
    &.left {
      flex: 1;
      flex-shrink: 1;
      word-break: break-word;
    }
    &.between {
      flex-shrink: 1;
    }
  }
}
</style>
