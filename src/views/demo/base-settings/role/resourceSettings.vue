<template>
  <el-dialog title="资源配置" :visible.sync="resourceSettingsVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar wrap-class="hidden-scroll-x dialog-scroll-warp-height" style="text-align: center;">
      <el-transfer
        ref="resourceSettings"
        v-model="value"
        :titles="['待配置资源', '已配置资源']"
        :data="resourceData"
        target-order="unshift"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="资源名称"
        style="text-align: left; display: inline-block; height: 400px;"
        @change="handleChange"
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
  name: 'ResourceSettings',
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
      resourceSettingsVisible: this.visible,
      value: [],
      resourceData: [],
      originResource: [], // 原有资源
      addResource: [], // 最后需要添加的资源
      removeResource: [] // 最后需要删除的资源
    }
  },
  watch: {
    visible(value) { // 监听visible
      if (value) {
        this.queryByRoleId(this.roleId)
        this.queryByTenantId()
      }
      this.resourceSettingsVisible = value
    }
  },
  methods: {
    close() {
      this.$emit('setResourceSettingsVisible', false)
      this.value = []
      this.resourceData = []
      this.$refs.resourceSettings.clearQuery('left')
      this.$refs.resourceSettings.clearQuery('right')
    },
    confirm() {

    },
    queryByRoleId(roleId) {

    },
    queryByTenantId() {

    },
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1
    },
    handleChange(value, direction, movedKeys) {

    }
  }
}
</script>
