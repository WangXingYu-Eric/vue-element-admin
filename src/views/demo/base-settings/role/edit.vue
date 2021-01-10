<template>
  <el-dialog :title="title" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar class="pb-10" wrap-class="hidden-scroll-x dialog-scroll-warp-height">
      <el-form ref="editForm" :rules="rules" :model="editModel" label-width="100px" class="dialog-form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editModel.name" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="editModel.code" placeholder="角色编码" />
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-radio-group v-model="editModel.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="editModel.description" type="textarea" resize="none" rows="5" placeholder="不多于255个字符" />
        </el-form-item>
        <el-form-item label="角色备注" prop="remark">
          <el-input v-model="editModel.remark" type="textarea" resize="none" rows="5" placeholder="不多于255个字符" />
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
  name: 'RoleEdit',
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
      originCode: this.model.code,
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,50}$/, message: '只能包括中文、英文、数字、下划线且不多于50个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '角色编码不能为空', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9_]{1,50}$/, message: '只能包括英文、数字、下划线且不多于50个字符', trigger: 'blur' },
          { validator: this.duplicateCheckingForCode, trigger: 'blur' }
        ],
        status: [{ required: true, message: '角色状态不能为空' }],
        description: [{ max: 255, message: '角色描述不多于255个字符' }],
        remark: [{ max: 255, message: '角色备注不多于255个字符' }]
      }
    }
  },
  watch: {
    visible(value) { // 监听visible
      this.editVisible = value
      this.originCode = this.model.code // 记录未修改前的code
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

    },
    update() {

    },
    duplicateCheckingForCode(rule, value, callback) {
      if (this.originCode !== value) {

      } else {
        callback()
      }
    }
  }
}
</script>

