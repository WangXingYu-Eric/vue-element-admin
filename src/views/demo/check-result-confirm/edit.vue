<template>
  <div>
    <el-dialog :title="title" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
      <el-scrollbar wrap-class="hidden-scroll-x dialog-scroll-warp-height">
        <el-form ref="editForm" :rules="rules" :model="editModel" label-width="100px" class="dialog-form">
          <el-form-item label="原因" prop="audit">
            <el-input v-model="editModel.audit" type="textarea" resize="none" rows="5" placeholder="不多于255个字符" />
          </el-form-item>

        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="confirm">回退维护</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList2 } from '@/api/demo/data-maintenance/dongjiangao'
export default {
  name: 'SpeechCraft',
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
        visittype: [
          { required: true, message: '回访类型不能为空', trigger: 'blur' }
        ],
        businscenario: [
          { required: true, message: '回访场景不能为空', trigger: 'blur' }
        ],
        speechcontent: [
          { required: true, message: '话术内容不能为空', trigger: 'blur' },
          { max: 255, message: '话术内容不多于255个字符' }
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
    insert() {

    },
    update() {
    }
  }
}
</script>

