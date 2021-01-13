<template>
  <div class="page-container">
    <el-divider content-position="left">报告回执处理</el-divider>
    <div class="filter-container">
      <el-form ref="form1" :model="filter1" :rules="rules1" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报地区:" prop="reportArea">
              <el-select v-model="filter1.reportArea" :placeholder="'请选择上报地区'" clearable style="width: 100%">
                <el-option :key="'1'" :label="'浙江分公司'" :value="'浙江分公司'" />
                <el-option :key="'2'" :label="'大连分公司'" :value="'大连分公司'" />
                <el-option :key="'3'" :label="'送公司'" :value="'送公司'" />
                <el-option :key="'4'" :label="'宁波分公司'" :value="'宁波分公司'" />
                <el-option :key="'5'" :label="'上海分公司'" :value="'上海分公司'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报机构:" prop="dataYear">
              <el-select v-model="filter1.reportGroup" :placeholder="'请选择上报机构'" clearable style="width: 100%">
                <el-option :key="'1'" :label="'浙江分公司'" :value="'浙江分公司'" />
                <el-option :key="'2'" :label="'大连分公司'" :value="'大连分公司'" />
                <el-option :key="'3'" :label="'送公司'" :value="'送公司'" />
                <el-option :key="'4'" :label="'宁波分公司'" :value="'宁波分公司'" />
                <el-option :key="'5'" :label="'上海分公司'" :value="'上海分公司'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="报送频度:" prop="dataMonth">
              <el-select v-model="filter1.dataFrequency" :placeholder="'请选择上报地区'" clearable style="width: 100%">
                <el-option :key="'1'" :label="'一般'" :value="'一般'" />
                <el-option :key="'2'" :label="'频繁'" :value="'频繁'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报年度:" prop="dataYear">
              <el-date-picker v-model="filter1.dataYear" align="right" type="year" format="yyyy" placeholder="请选择数据年度" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报区间:" prop="dataMonth">
              <el-select v-model="filter1.dataRange" :placeholder="'请选择上报地区'" clearable style="width: 100%">
                <el-option :key="'1'" :label="'一般'" :value="'一般'" />
                <el-option :key="'2'" :label="'频繁'" :value="'频繁'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter1" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider content-position="left">上报信息列表</el-divider>
    <el-table ref="table1" v-loading="tableLoading1" :data="tableData1" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" min-width="50" />
      <el-table-column prop="jobNumber" label="任务号" align="center" min-width="100" />
      <el-table-column prop="batchNumber" label="批次号" align="center" min-width="100" />
      <el-table-column prop="jobType" label="任务类型" align="center" min-width="100" />
      <el-table-column prop="majorJob" label="所属主任务" align="center" min-width="100" />
      <el-table-column prop="dataRange" label="数据区间" align="center" min-width="100" />
      <el-table-column prop="reportStatus" label="上报状态" align="center" min-width="110" />
      <el-table-column prop="reportStatus" label="校验状态" align="center" min-width="100" />
      <el-table-column prop="dataStartTime" label="上报起始日期" align="center" min-width="100" />
      <el-table-column prop="dataEndTime" label="上报截止日期" align="center" min-width="100" />
      <el-table-column prop="dataProcessTime" label="处理时间" align="center" min-width="130" />
    </el-table>
    <pagination v-show="pagination1.total>0" :total="pagination1.total" :page.sync="pagination1.page" :limit.sync="pagination1.limit" class="float-right" @pagination="fetchList1()" />
    <div class="clearfix" />
    <div class="filter-container">
      <el-row>
        <el-col :sm="12" :lg="20">
          <el-form ref="uploadForm" :rules="rules" :model="uploadModel" label-width="160px" class="dialog-form">
            <el-form-item label="监管报告导入">
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="uploadUrl"
                :multiple="true"
                :accept="'.xls,.xlsx'"
                :auto-upload="false"
                :on-change="onChange"
                :on-success="onSuccess"
                :on-remove="onRemove"
                :show-file-list="true"
                :http-request="uploadFile"
                style="border:1px dashed  #eee ;padding:20px;text-align: left;"
              >
                <el-button slot="trigger" size="small" type="primary">选择报告</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="confirm2">导入</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" style="margin-bottom:20px;">
          <el-form ref="form2" :model="filter2" :rules="rules1" class="form-container" @submit.native.prevent>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label-width="160px" label="报送结论:" prop="reportArea">
                  <el-select v-model="filter2.report" :placeholder="'请选择'" clearable style="width: 100%">
                    <el-option :key="'1'" :label="'结论'" :value="'浙江分公司'" />
                    <el-option :key="'2'" :label="'结论2'" :value="'大连分公司'" />
                    <el-option :key="'3'" :label="'结论3'" :value="'送公司'" />
                    <el-option :key="'4'" :label="'结论4'" :value="'宁波分公司'" />
                    <el-option :key="'5'" :label="'结论5'" :value="'上海分公司'" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8"><el-button type="primary">保存</el-button></el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList1 } from '@/api/demo/data-maintenance/dongjiangao'

export default {
  name: 'Redirect',
  components: { Pagination },
  data() {
    return {
      filter1: {
        reportArea: '',
        reportGroup: '',
        dataFrequency: '',
        dataYear: '',
        dataRange: ''
      },
      filter2: {
        report: ''
      },
      rules1: {
      },
      tableData1: [],
      tableLoading1: false,
      pagination1: {
        page: 1,
        limit: 10,
        total: 10
      },
      uploadModel: {},
      editModel: {
        audit: ''
      },
      fullscreenLoading: false,
      uploadUrl: process.env.VUE_APP_GATEWAY + '/' + process.env.VUE_APP_CORE + '/retainedByBancassurance/importListAssignment',
      rloading: null,
      hasFile: false,
      files: []
    }
  },
  mounted() {
    this.fetchList1()
  },
  methods: {
    fetchList1() {
      this.tableLoading1 = true
      fetchList1(this.filter1, this.pagination1).then(response => {
        this.tableData1 = response.data.list
        this.pagination1.total = response.data.total
        this.tableLoading1 = false
      }).catch(error => {
        console.log(error)
        this.tableLoading1 = false
      })
    },
    handleFilter1() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.fetchList1()
        } else {
          return false
        }
      })
    },
    // 文件上传
    onChange(file, fileList) {
      if (fileList.length > 0) {
        this.hasFile = true
      }
      //        this.$refs.editForm.validateField('indexFile')
    },
    onSuccess(response, file, fileList) {
      // 上传成功后提交插入
      //        this.insert()

      this.files = []
    },
    onRemove(file, fileList) {
      // 删除文件后,hasFile状态重置
      if (fileList.length === 0) {
        this.hasFile = false
        this.suffix = null
      }
    },
    uploadFile(file) {
      this.files.push(file.file)
    },
    openLoading() {
      const loading = this.$loading({ // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '附件拼命上传中，请稍后...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.7)', // 背景颜色
        target: '.sub-main', // 需要遮罩的区域
        body: true,
        customClass: 'mask' // 遮罩层新增类名
      })
      return loading
    },
    confirm2() {
      //        this.$refs.editForm.validate(valid => {
      //          if (valid) {
      console.log(this.uploadUrl)
      this.$refs.upload.submit()
      if (this.files.length === 0) {
        this.$message({
          message: '请选择文件',
          type: 'error'
        })
        return false
      }
      // this.rLoading = this.openLoading()
      // var that = this
      // 上传文件
      // request({
      //   url: that.uploadUrl,
      //   method: 'post',
      //   contentType: 'multipart/form-data',
      //   data: { 'files': this.files }
      // }).then(result => {
      //   console.log(result.success)
      //   if (result.success) {
      //     this.$refs.upload.onSuccess()
      //     this.rLoading.close()
      //     this.$message({
      //       message: '添加成功',
      //       type: 'success'
      //     })
      //     this.dialogTitle = ''
      //   } else {
      //     this.$message({
      //       message: result.message,
      //       type: 'error'
      //     })
      //   }
      // })
    }
  }
}
</script>

<style scoped>
</style>

