<template>
  <div class="cy-cell">
    <div class="cy-cell-left" :class="type" :style="width && type === 'left' ? `width: ${width}px` : ''">
      <slot name="left">{{ label }}</slot>
    </div>
    <div class="cy-cell-right" :class="type" :style="width && type === 'right' ? `width: ${width}px` : ''">
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
    label: {
      type: String,
      default: ''
    },
		// 左/右固定的宽度，传0不设置
    width: {
      type: Number,
      default: 80
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
	.cy-cell {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		line-height: 24px;
		padding: 6px 0;

		.cy-cell-left {
			color: $fontColor6;
			flex-shrink: 0;
			&.right {
				flex: 1;
				flex-shrink: 1 !important;
				word-break: break-word;
			}
			&.between{
				flex-shrink: 1 !important;
			}
		}

		.cy-cell-right {
			color: $fontColor6;
			flex-shrink: 0;
			&.left {
				flex: 1;
				flex-shrink: 1 !important;
				word-break: break-word;
			}
			&.between{
				flex-shrink: 1 !important;
			}
		}
	}
</style>
