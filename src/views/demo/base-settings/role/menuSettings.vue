<template>
  <el-dialog title="菜单配置" :visible.sync="menuSettingsVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar ref="treeScrollbar" wrap-class="hidden-scroll-x dialog-scroll-warp-height" style="text-align: center; padding-bottom: 17px;">
      <el-tree
        ref="tree"
        v-loading="treeLoading"
        :data="treeData"
        node-key="id"
        show-checkbox
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        @check-change="checkChange"
        @node-click="()=>{}"
      />
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>


export default {
  name: 'MenuSettings',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      treeLoading: true,
      treeData: [],
      selectedData: [],
      defaultProps: {
        children: 'children',
        label: 'nameCn'
      },
      menuSettingsVisible: this.visible,
      value: [],
      originMenu: [], // 原有菜单
      addMenu: [], // 最后需要添加的菜单
      removeMenu: [] // 最后需要删除的菜单
    }
  },
  watch: {
    visible(value) { // 监听visible
      if (value) {
        this.queryList()
      }
      this.menuSettingsVisible = value
    }
  },
  methods: {
    close() {
      this.$emit('setMenuSettingsVisible', false)
      this.value = []
      this.treeData = []
    },
    confirm() {

    },
    queryByRoleId(roleId) {
      queryByRoleId(roleId).then(result => {
        if (result.success) {
          this.value = result.data
          this.originMenu = result.data
          // this.value.forEach(key => {
          //   this.$refs.tree.setChecked(key, true, false)
          // })
          this.checkIndeterminate(this.treeData)
        }
      })
    },
    queryList() { // 查询
      this.treeLoading = true
    },
    checkChange() { // 获取选中行

    },
    checkIndeterminate(data) {
      let type = '' // 父节点的状态类型
      let selectedCount = 0 // data中选中项的数量
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        if (node.children) {
          const currentType = this.checkIndeterminate(node.children)
          if (currentType === 'selected') {
            this.$refs.tree.setChecked(node.id, true, false)
          }
        } else {
        }
      }
      if (!type) {
        if (data.length === selectedCount) {
          type = 'selected'
        }
      }
      return type
    }
  }
}
</script>
