<template>
  <el-dialog :title="title" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar class="pb-10" wrap-class="hidden-scroll-x dialog-scroll-warp-height">
      <el-form ref="editForm" :rules="rules" :model="editModel" label-width="100px" class="dialog-form">
        <el-form-item label="对象名称" prop="beanName">
          <el-input v-model="editModel.beanName" placeholder="对象名称" />
        </el-form-item>
        <el-form-item label="参数" prop="params">
          <el-input v-model="editModel.params" placeholder="参数" />
        </el-form-item>
        <el-form-item label="周期表达式" prop="cronExpression">
          <el-input v-model="editModel.cronExpression" placeholder="周期表达式" />
        </el-form-item>
        <el-form-item label="任务描述" prop="description">
          <el-input v-model="editModel.description" placeholder="任务描述" />
        </el-form-item>
        <el-form-item label="任务备注" prop="remark">
          <el-input v-model="editModel.remark" placeholder="任务备注" />
        </el-form-item>
        <el-form-item label="任务状态" prop="status">
          <el-radio-group v-model="editModel.status">
            <el-radio :label="0">暂停</el-radio>
            <el-radio :label="1">运行</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'JobEdit',
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
      editVisible: this.visible,
      editModel: this.model,
      serviceName: 'core-service',
      rules: {
        beanName: [
          { required: true, message: '对象名称不能为空', trigger: 'blur' },
          { pattern: /^[a-z][A-Za-z]{1,50}$/, message: '只能是英文且不多于200个字符,首字母小写', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: '周期表达式不能为空', trigger: 'blur' }
        ],
        status: [{ required: true, message: '任务状态不能为空' }]
      }
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
    insert() {
      this.editModel.serviceName = 'core-service'
    },
    update() {

    }
  }
}
</script>

