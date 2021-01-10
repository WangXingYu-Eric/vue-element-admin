<template>
  <div>
    <el-dialog :title="title" :visible.sync="editVisible" width="768px" :close-on-click-modal="false" @close="close">
      <el-scrollbar class="pb-10" wrap-class="hidden-scroll-x dialog-scroll-warp-height">
        <el-form ref="editForm" :rules="rules" :model="editModel" label-width="100px" class="dialog-form">
          <el-form-item label="登录名" prop="username">
            <el-input v-model="editModel.username" placeholder="登录名" />
          </el-form-item>
          <el-form-item label="中文姓名" prop="nameCn">
            <el-input v-model="editModel.nameCn" placeholder="中文姓名" />
          </el-form-item>
          <el-form-item label="英文名" prop="nameEn">
            <el-input v-model="editModel.nameEn" placeholder="英文名" />
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="editModel.email" placeholder="用户邮箱" />
          </el-form-item>
          <el-form-item label="用户电话" prop="phone">
            <el-input v-model="editModel.phone" placeholder="用户电话" />
          </el-form-item>
          <el-form-item label="用户状态" prop="enabled">
            <el-radio-group v-model="editModel.enabled">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户备注" prop="remark">
            <el-input v-model="editModel.remark" type="textarea" resize="none" rows="5" placeholder="不多于255个字符" />
          </el-form-item>
          <el-collapse :value="activeName">
            <el-collapse-item title="用户详细信息" name="details">
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="editModel.userDetails.gender">
                  <el-radio :label="false">男</el-radio>
                  <el-radio :label="true">女</el-radio>
                </el-radio-group>
              </el-form-item>
             <!-- <el-form-item label="企业微信号" prop="userDetails.extend2">
                <el-input v-model="editModel.userDetails.extend2" placeholder="企业微信号" />
              </el-form-item>-->
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker v-model="editModel.userDetails.birthday" value-format="yyyy-MM-dd" class="date" placeholder="出生日期" />
              </el-form-item>
              <el-form-item label="入职日期" prop="entryDate">
                <el-date-picker v-model="editModel.userDetails.entryDate" value-format="yyyy-MM-dd" class="date" placeholder="入职日期" />
              </el-form-item>
              <el-form-item label="工号" prop="workCode">
                <el-input v-model="editModel.userDetails.workCode" placeholder="工号" />
              </el-form-item>
              <el-form-item label="工作岗位" prop="operatingPost">
                <el-input v-model="editModel.userDetails.operatingPost" placeholder="工作岗位" />
              </el-form-item>
              <person-pick v-model="editModel.userDetails.leader" :label-name="'直属领导'" :prop-name="'leader'" />
              <el-table-column label="呼出/呼入" align="left" min-width="150">
                <dict-select v-model="editModel.userDetails.extend4" :code="'call_in_out_type'" :label-name="'呼入/呼出'" :prop-name="'id'" />
              </el-table-column>
              <el-table-column label="属性角色" align="left" min-width="150">
                <dict-select v-model="editModel.userDetails.extend5" :code="'caller_type'" :label-name="'人员分类'" :prop-name="'id'" />
              </el-table-column>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
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
      activeName: [],
      originUserName: this.model.username,
      originExtend1: this.model.userDetails.extend1,
      rules: {
        nameCn: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,50}$/, message: '只能包括中文、英文、数字、下划线且不多于50个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '登录名不能为空', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9_]{1,50}$/, message: '只能包括英文、数字、下划线且不多于50个字符', trigger: 'blur' },
          { validator: this.queryDuplicateUserName, trigger: 'blur' }
        ],
        email: [
          { pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/, message: '用户邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { pattern: /^0?(13|14|15|17|18|19)[0-9]{9}$/, message: '用户电话格式不正确', trigger: 'blur' }
        ],
        enabled: [{ required: true, message: '用户状态不能为空' }],
        // 'userDetails.extend2': [{ required: true, message: '企业微信号不能为空' }],
        remark: [{ max: 255, message: '用户备注不多于255个字符' }]
      },
      personSearchVisible: false
    }
  },
  watch: {
    visible(value) { // 监听visible
      this.editVisible = value
      this.activeName = []
      this.originUserName = this.model.username // 记录未修改前的
      this.originExtend1 = this.model.userDetails.extend1
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
    queryDuplicateUserName(rule, value, callback) {
      if (this.originUserName !== value.trim()) {

      } else {
        callback()
      }
    },
    queryDuplicateExtend1(rule, value, callback) {
      if (this.originExtend1 !== value.trim()) {

      } else {
        callback()
      }
    },
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

