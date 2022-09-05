<template>
  <el-select
    ref="select"
    :value="value"
    placeholder="请选择"
    size="mini"
    clearable
    :disabled="disabled"
    :filterable="filterable"
    :filter-method="filterMethod"
    @clear="clear"
    @visible-change="visibleChange"
  >
    <el-option
      ref="option"
      class="tree-select__option"
      :value="optionData.id"
      :label="optionData.name"
    >
      <el-tree
        ref="tree"
        class="tree-select__tree"
        :node-key="nodeKey"
        :data="data"
        :props="props"
        :default-expanded-keys="[value]"
        highlight-current
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'CyTreeSelect',
  props: {
    // v-model绑定
    value: {
      type: [String, Number],
      default: ''
    },
    // 树形的数据
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: [String, Number],
      default: 'id'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // tree的props配置
    props: {
      type: Object,
      default: function () {
        return {
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  data() {
    return {
      optionData: {
        id: '',
        name: ''
      },
      filterFlag: false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!this.isEmpty(this.data)) {
          this.init(val)
        }
      },
      immediate: true
    },
    data: function (val) {
      if (!this.isEmpty(val)) {
        this.init(this.value)
      }
    }
  },
  methods: {
    // 是否为空
    isEmpty(val) {
      for (let key in val) {
        return false
      }
      return true
    },
    handleNodeClick(data) {
      this.$emit('input', data[this.nodeKey])
      this.$refs.select.visible = false
    },
    init(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(val)
          const node = this.$refs.tree.getNode(val)
          this.optionData.id = val
          this.optionData.name = node.label
        })
      } else {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(null)
        })
      }
    },
    visibleChange(e) {
      if (e) {
        this.filterFlag && this.$refs.tree.filter('')
        this.filterFlag = false
        const selectDom = this.$refs.tree.$el.querySelector('.is-current')
        setTimeout(() => {
          this.$refs.select.scrollToOption({ $el: selectDom })
        }, 0)
      }
    },
    clear() {
      this.$emit('input', '')
    },
    filterMethod(val) {
      this.filterFlag = true
      this.$refs.tree.filter(val)
    },
    filterNode(value, data) {
      if (!value) return true
      const label = this.props.label || 'name'
      return data[label].indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss">
.tree-select__option {
  height: auto;
  line-height: 1;
  padding: 0;
  background-color: #fff;
}

.tree-select__tree {
  padding: 4px 20px;
  font-weight: 400;
  .el-tree-node.is-current > .el-tree-node__content {
    color: $mainColor;
    font-weight: 700;
  }
}
</style>