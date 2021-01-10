<template>
  <el-dialog :title="title" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
    <el-scrollbar class="pb-10" wrap-class="hidden-scroll-x dialog-scroll-warp-height">
      <el-form ref="editForm" :rules="rules" :model="editModel" label-width="120px" class="dialog-form">
        <el-form-item label="字典项名称" prop="name">
          <el-input v-model="editModel.name" placeholder="字典项名称" />
        </el-form-item>
        <el-form-item label="字典项名称值" prop="value">
          <el-input v-model="editModel.value" placeholder="字典项名称值" />
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
  name: 'DictionaryItemsEdit',
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
      rules: {
        name: [
          { required: true, message: '字典项名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,50}$/, message: '只能包括中文、英文、数字、下划线且不多于50个字符', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '字典项编码不能为空', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9_]{1,50}$/, message: '只能包括英文、数字、下划线且不多于50个字符', trigger: 'blur' }
        ]
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
    },
    update() {
    }
  }
}
</script>

