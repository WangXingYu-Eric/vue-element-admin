<template>
  <div>
    <el-dialog :title="title" :visible.sync="editVisible" width="868px" :close-on-click-modal="false" @close="close">
      <div class="filter-container">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
            <img src="http://13810600758.qicp.vip/workflow-service/app/getProcessDiagram/60001"  style="width:100%;height:100%;"/>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'PublishManage',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      query: {
        params: {
        }
      },
      editVisible: this.visible,
      editModel: this.model,
      rules: {
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      tenantSearchVisible: false
    }
  },
  watch: {
    visible(value) { // 监听visible
      this.editVisible = value
      this.$nextTick(() => {
        // 清空验证信息
        this.$refs.editForm.clearValidate()
      })
    },
    model(value) { // 监听model
      this.editModel = value
    }
  },
  methods: {
    close() {
      this.$emit('setEditVisible', false)
    },
    confirm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.type === 'insert') {
            this.insert()
          } else {
            this.update()
          }
        }
      })
    },
    confirmPublish() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.type === 'insert') {
            this.insertPublish()
          } else {
            this.updatePublish()
          }
        }
      })
    },

    insert() {
    },
    insertPublish() {
    },
    updatePublish() {
    },
    update() {
    }
  }
}
</script>

