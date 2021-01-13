<template>
  <div>
    <el-dialog :title="title" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
      <el-scrollbar class="pb-10" wrap-class="hidden-scroll-x dialog-scroll-warp-height">
        <el-form ref="editForm" :rules="rules" :model="editModel" label-width="100px" class="dialog-form">
          <el-form-item label="内容" prop="content">
            <el-input v-model="editModel.content" type="textarea" resize="none" rows="15" placeholder="公告内容" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button type="primary" @click="confirmPublish">保存并发布</el-button>
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

