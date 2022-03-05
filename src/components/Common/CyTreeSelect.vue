<template>
    <el-select ref="select" :value="value" placeholder="请选择" size="mini" @visible-change="visibleChange" clearable style="width: 100%;" @clear="clear">
        <el-option ref="option" class="option" :value="optionData.id" :label="optionData.name">
            <el-tree ref="tree" class="tree" :node-key="nodeKey" :data="data" :props="props" :default-expanded-keys='[value]'
                highlight-current :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
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
                default: function() {
                    return []
                }
            },
            // 每个树节点用来作为唯一标识的属性
            nodeKey: {
                type: [String, Number],
                default: 'id'
            },
            // tree的props配置
            props: {
                type: Object,
                default: function() {
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
				}
            }
        },
        watch: {
            'value': function(val) {
                if(!this.isEmpty(this.data)){
                    this.init(val)
                }
            },
            'data': function(val) {
                if(!this.isEmpty(val)){
                    this.init(this.value)
                }
            }
        },
        mounted() {
            if(!this.isEmpty(this.data)){
                this.init(this.value)
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
                let label = this.props.label || 'name'
                this.$emit('input', data[this.nodeKey])
                this.optionData.id = data[this.nodeKey]
                this.optionData.name = data[label]
                this.$refs.select.visible = false
            },
            init(val) {
                if (val) {
                    this.$nextTick(() => {
                        let label = this.props.label || 'name'
                        this.$refs.tree.setCurrentKey(val)
                        let node = this.$refs.tree.getNode(val)
                        this.optionData.id = val
                        this.optionData.name = node.label
                    })
                } else{
                    this.$refs.tree.setCurrentKey(null)
                }
            },
            visibleChange(e) {
                if(e) {
                    let selectDom = document.querySelector('.is-current')
                    setTimeout(() => {
                        this.$refs.select.scrollToOption({$el: selectDom})
                    },0)
                }
            },
            clear() {
                this.$emit('input', '')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .option {
        height: auto;
        line-height: 1;
        padding: 0;
        background-color: #fff;
    }

    .tree {
        padding: 4px 20px;
        font-weight: 400;
    }
</style>