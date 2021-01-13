<template>
  <div class="page-container">
    <el-divider content-position="left">待提取作业列表</el-divider>
    <div class="filter-container">
      <el-form ref="form1" :model="filter1" :rules="rules1" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="报送方式:" prop="reportType">
              <el-select v-model="filter1.reportType" :placeholder="'请选择报送方式'" clearable class="width-100">
                <el-option :key="'1'" :label="'集中采集'" :value="'集中采集'" />
                <el-option :key="'2'" :label="'持续采集'" :value="'持续采集'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="报送频率:" prop="reportPl">
              <el-select v-model="filter1.reportPl" :placeholder="'请选择报送频率'" clearable class="width-100">
                <el-option :key="'1'" :label="'每天'" :value="'每天'" />
                <el-option :key="'2'" :label="'每月'" :value="'每月'" />
                <el-option :key="'3'" :label="'每年'" :value="'每年'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报状态:" prop="reportZt">
              <el-select v-model="filter1.reportZt" :placeholder="'请选择上报状态'" clearable class="width-100">
                <el-option :key="'1'" :label="'人工维护中'" :value="'人工维护中'" />
                <el-option :key="'2'" :label="'待人工维护'" :value="'待人工维护'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报年度:" prop="dataYear">
              <el-date-picker v-model="filter1.dataYear" align="right" type="year" format="yyyy" placeholder="请选择数据年度" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报月份:" prop="dataMonth">
              <el-date-picker v-model="filter1.dataMonth" align="right" type="month" format="yyyy-MM" placeholder="请选择数据月份" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-sticky-note-o" circle title="查看明细" class="float-right ml-10" @click.stop="handleFilter1" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter1" />
          </el-col>
        </el-row>
      </el-form>
      <el-col :sm="12" :lg="20">
        <el-form ref="uploadForm" :rules="rules" :model="uploadModel" label-width="160px" class="dialog-form">
          <el-form-item label="数据导入">
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
              <el-button slot="trigger" size="small" type="primary">选择数据</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="confirm2">导入</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <el-table ref="table1" v-loading="tableLoading1" :data="tableData1" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" min-width="50" />
      <el-table-column prop="jobNumber" label="任务号" align="center" min-width="100" />
      <el-table-column prop="batchNumber" label="批次号" align="center" min-width="100" />
      <el-table-column prop="jobType" label="任务类型" align="center" min-width="100" />
      <el-table-column prop="majorJob" label="所属主任务" align="center" min-width="100" />
      <el-table-column prop="reportStatus" label="上报状态" align="center" min-width="110" />
      <el-table-column prop="dataRange" label="数据区间" align="center" min-width="100" />
      <el-table-column prop="dataStartTime" label="数据起始日期" align="center" min-width="100" />
      <el-table-column prop="dataEndTime" label="数据截止日期" align="center" min-width="100" />
      <el-table-column prop="dataProcessTime" label="处理时间" align="center" min-width="130" />
    </el-table>
    <pagination v-show="pagination1.total>0" :total="pagination1.total" :page.sync="pagination1.page" :limit.sync="pagination1.limit" class="float-right" @pagination="fetchList1()" />
    <div class="clearfix" />
    <el-divider content-position="left">提取日志清单</el-divider>
    <div class="filter-container">
      <el-form ref="form2" :model="filter2" :rules="rules2" class="form-container" @submit.native.prevent />
    </div>
    <el-table ref="table2" v-loading="tableLoading2" :data="tableData2" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" min-width="50" />
      <el-table-column prop="ywb" label="业务表" align="center" min-width="100" />
      <el-table-column prop="bmc" label="表名称" align="center" min-width="100" />
      <el-table-column prop="zdbm" label="主导部门" align="center" min-width="100" />
      <el-table-column prop="tqzt" label="提取状态" align="center" min-width="100" />
      <el-table-column prop="tqsl" label="提取数量" align="center" min-width="110" />
      <el-table-column prop="rzms" label="日志描述" align="center" min-width="100" />
      <el-table-column prop="dataStartTime" label="数据起始日期" align="center" min-width="100" />
      <el-table-column prop="dataEndTime" label="数据截止日期" align="center" min-width="100" />
      <el-table-column prop="dataProcessTime" label="处理时间" align="center" min-width="130" />
    </el-table>
    <pagination v-show="pagination2.total>0" :total="pagination2.total" :page.sync="pagination2.page" :limit.sync="pagination2.limit" class="float-right" @pagination="fetchList2()" />

  </div>
</template>

<script>

import Pagination from '@/components/Pagination/index'
import { fetchList1, fetchList2 } from '@/api/demo/data-collection/mapping-setting'

export default {
  name: 'MappingSettingIndex',
  components: { Pagination },
  data() {
    return {
      filter1: {
        reportType: '',
        dataYear: '',
        dataMonth: ''
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
      filter2: {
        name: '',
        gender: '',
        cardType: '',
        cardNo: '',
        birthday: ''
      },
      rules2: {
      },
      tableData2: [],
      tableLoading2: false,
      pagination2: {
        page: 1,
        limit: 10,
        total: 10
      }
    }
  },
  mounted() {
    this.fetchList1()
    this.fetchList2()
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
    fetchList2() {
      this.tableLoading2 = true
      fetchList2(this.filter2, this.pagination2).then(response => {
        this.tableData2 = response.data.list
        this.pagination2.total = response.data.total
        this.tableLoading2 = false
      }).catch(error => {
        console.log(error)
        this.tableLoading2 = false
      })
    },
    handleFilter2() {
      this.$refs.form2.validate(valid => {
        if (valid) {
          this.fetchList2()
        } else {
          return false
        }
      })
    }
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
</script>

<style scoped>
</style>

