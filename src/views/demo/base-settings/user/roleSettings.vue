<template>
  <el-dialog title="角色配置" :visible.sync="roleSettingsVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar wrap-class="hidden-scroll-x dialog-scroll-warp-height" style="text-align: center;">
      <el-transfer
        ref="roleSettings"
        v-model="value"
        :titles="['待配置角色', '已配置角色']"
        :data="roleData"
        target-order="unshift"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="角色名称"
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
  name: 'UserRoleSettings',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleSettingsVisible: this.visible,
      value: [],
      roleData: [],
      originRole: [], // 原有角色
      addRole: [], // 最后需要添加的角色
      removeRole: [] // 最后需要删除的角色
    }
  },
  watch: {
    visible(value) { // 监听visible
      if (value) {
        this.queryByUserId(this.userId)
        this.queryByTenantId()
      }
      this.roleSettingsVisible = value
    }
  },
  methods: {
    close() {
      this.$emit('setRoleSettingsVisible', false)
      this.value = []
      this.roleData = []
      this.$refs.roleSettings.clearQuery('left')
      this.$refs.roleSettings.clearQuery('right')
    },
    confirm() {

    },
    queryByUserId(userId) {

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
