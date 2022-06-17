<template>
  <div class="cy-loading-wrap" flex="align:center justify:center">
    <div class="cy-loading">
      <span
        class="dot"
        v-for="item in num"
        :key="item"
        :style="{
          backgroundColor: color,
          width: size + 'px',
          height: size + 'px'
        }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  // 加载组件
  name: 'CyLoading',
  props: {
    // 圆点的个数
    num: {
      type: Number,
      default: 3
    },
    //圆点的尺寸 px
    size: {
      type: Number,
      default: 12
    },
    //圆点的颜色
    color: {
      type: String,
      default: '#000000'
    }
  }
}
</script>

<style scoped lang="scss">
.cy-loading {
  @keyframes load-animate {
    50% {
      opacity: 0.2;
      transform: scale(0.75);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .dot {
    display: inline-block;
    vertical-align: bottom;
    border-radius: 50%;
    margin: 3px;
    animation-fill-mode: both;
    animation: load-animate 0.6s 0s infinite linear;
  }

  .dot:nth-child(2n-1) {
    animation-delay: 0.3s;
  }
}
</style>
