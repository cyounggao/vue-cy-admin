<template>
  <div class="cy-image" :style="imgStyle" ref="cyImage">
    <el-image
      ref="elIamge"
      :src="imgSrc"
      :preview-src-list="srcList"
      :fit="fit"
      :class="{ 'cy-image--black': imgBg }"
      :z-index="9999"
      style="display: block; height: 100%"
      @load="loadSuccess"
    >
      <div slot="placeholder" class="cy-image__placeholder">
        <img
          src="../../assets/images/fail-img.png"
          :style="`width: ${imgWidth}px;`"
        />
      </div>
      <div slot="error" class="cy-image__error">
        <img
          src="../../assets/images/fail-img.png"
          :style="`width: ${imgWidth}px;`"
        />
      </div>
    </el-image>
    <div v-if="icon" class="cy-image__icon" :style="{ borderRadius: radius }">
      <i class="iconfont" :style="`font-size: ${size}px`" :class="icon" />
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
// 图片组件
export default {
  name: 'CyImage',
  props: {
    // 图片路径
    src: {
      type: String,
      default: ''
    },
    //图片上的图标，false无图标
    icon: {
      type: [String, Boolean],
      default: false
    },
    // 圆角
    radius: {
      type: String,
      default: '5px'
    },
    //图标的尺寸
    size: {
      type: Number,
      default: 16
    },
    //图片的比例 高/宽 ,借助这个算图片的高度
    ratio: {
      type: Number,
      default: 1.78
    },
    //图片是否可以点击预览
    preview: {
      type: [Boolean, Array],
      default: false
    },
    //图片的宽度，不传通过js获取
    width: {
      type: Number,
      default: 0
    },
    fit: {
      type: String,
      default: 'contain'
    }
  },
  data() {
    return {
      imgBg: false,
      imgWidth: 0
    }
  },
  computed: {
    imgSrc() {
      return this.src
    },
    srcList() {
      if (this.$isArr(this.preview)) {
        return this.preview
      } else {
        return this.preview ? [this.imgSrc] : []
      }
    },
    wrap() {
      return this.$refs.cyImage
    },
    imgStyle() {
      let style = {
        borderRadius: this.radius
      }
      this.width && (style.width = this.width + 'px')
      return style
    }
  },
  watch: {
    ratio(val) {
      if (val) {
        this.getHeight()
      }
    }
  },
  mounted() {
    addResizeListener(this.wrap, this.getHeight)
    this.getHeight()
  },
  beforeDestroy() {
    removeResizeListener(this.wrap, this.getHeight)
  },
  methods: {
    loadSuccess(e) {
      let img = e.target || {}
      let ratio = getRatio({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
      if (ratio !== this.ratio && this.fit !== 'cover') {
        this.imgBg = true
      }
      function getRatio(obj) {
        if (obj && obj.height && obj.width) {
          let num = obj.height / obj.width
          num = num.toFixed(2) - 0
          return num
        } else {
          return 1
        }
      }
    },
    getHeight() {
      let width = 0
      if (this.width) {
        width = this.width
      } else {
        width = this.wrap.getBoundingClientRect().width
      }

      if (width) {
        let height = Math.round(width * this.ratio)
        if (this.ratio > 1) {
          this.imgWidth = width * 0.4
        } else {
          this.imgWidth = height * 0.4
        }
        this.wrap.style.height = height + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.cy-image {
  position: relative;
  overflow: hidden;

  .cy-image__icon {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    cursor: pointer;

    .iconfont {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $whiteColor;
      line-height: 1;

      &::after {
        content: '';
        position: absolute;
        width: 50%;
        height: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $blackColor;
        z-index: 1;
      }

      &::before {
        position: relative;
        z-index: 2;
      }
    }
  }
}

.cy-image--black {
  .el-image__inner {
    background-color: $blackColor;
  }
}

.cy-image__error {
  background: #f2f2f4;
}

.cy-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background-color: #f2f2f4;
  background: linear-gradient(90deg, #f2f2f4 25%, #e6e6e6 37%, #f2f2f4 63%);
  background-size: 400% 100%;
  animation: el-skeleton-loading 1.4s ease infinite;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
