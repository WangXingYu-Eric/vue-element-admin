<template>
  <div class="page-container">
    <el-divider content-position="left">上报参数列表</el-divider>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="index" label="序号" align="center" min-width="50" />
      <el-table-column prop="reportArea" label="上报地区" align="center" min-width="150" />
      <el-table-column prop="licenseCode" label="金融许可证代码" align="center" min-width="100" />
      <el-table-column prop="superviseCode" label="监管统计系统代码" align="center" min-width="100" />
      <el-table-column prop="reportType" label="上报类型" align="center" min-width="150" />
      <el-table-column prop="reportWay" label="上报方式" align="center" min-width="100" />
      <el-table-column prop="date" label="配置日期" align="center" min-width="100" />
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList" />
    <div class="clearfix" />
    <el-divider content-position="left">报送参数配置</el-divider>
    <el-form ref="form" :model="reportParameter" :rules="rules" class="form-container" @submit.native.prevent>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="上报地区:" prop="reportArea">
            <el-select v-model="reportParameter.reportArea" :placeholder="'请选择上报地区'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'浙江分公司'" :value="'浙江分公司'" />
              <el-option :key="'2'" :label="'大连分公司'" :value="'大连分公司'" />
              <el-option :key="'3'" :label="'送公司'" :value="'送公司'" />
              <el-option :key="'4'" :label="'宁波分公司'" :value="'宁波分公司'" />
              <el-option :key="'5'" :label="'上海分公司'" :value="'上海分公司'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="上报方式:" prop="reportWay">
            <el-select v-model="reportParameter.reportWay" :placeholder="'请选择上报方式'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'线上'" :value="'线上'" />
              <el-option :key="'2'" :label="'线下'" :value="'线下'" />
              <el-option :key="'3'" :label="'FTP'" :value="'FTP'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="上报类型:" prop="reportType">
            <el-select v-model="reportParameter.reportType" :placeholder="'请选择上报类型'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'持续采集'" :value="'1'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="120px" label="金融许可证代码:" prop="licenseCode">
            <el-input v-model="reportParameter.licenseCode" :placeholder="'请输入金融许可证代码'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="130px" label="监管统计系统代码:" prop="superviseCode">
            <el-input v-model="reportParameter.superviseCode" :placeholder="'请输入监管统计系统代码'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="110px" label="保险公司名称:" prop="insuranceCompany">
            <el-input v-model="reportParameter.insuranceCompany" :placeholder="'请输入监管统计系统代码'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="ftpIp:" prop="ftpIp">
            <el-input v-model="reportParameter.ftpIp" :placeholder="'请输入ftpIp'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="ftpPort:" prop="ftpPort">
            <el-input v-model="reportParameter.ftpPort" :placeholder="'请输入ftpPort'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="ftpAccount:" prop="ftpAccount">
            <el-input v-model="reportParameter.ftpAccount" :placeholder="'请输入ftpAccount'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="ftpPassword:" prop="ftpPassword">
            <el-input v-model="reportParameter.ftpPassword" :placeholder="'请输入ftpPassword'" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" class="float-right">
          <el-button type="danger" icon="fa fa-trash-o" circle title="删除" class="float-right ml-10" @click.stop="()=>{}" />
          <el-button type="primary" icon="fa fa-edit" circle title="修改" class="float-right" @click.stop="()=>{}" />
          <el-button type="success" icon="fa fa-plus" circle title="增加" class="float-right" @click.stop="()=>{}" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/base-settings/report-parameter'
import Pagination from '@/components/Pagination'
export default {
  name: 'ReportParameterIndex',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      pagination: {
        page: 1,
        limit: 10,
        total: 10
      },
      reportParameter: {
        reportArea: '',
        reportWay: '',
        reportType: '',
        licenseCode: '',
        superviseCode: '',
        insuranceCompany: '',
        ftpIp: '',
        ftpPort: '',
        ftpAccount: '',
        ftpPassword: ''
      },
      rules: {
      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.tableLoading = true
      fetchList(this.pagination).then(response => {
        this.tableData = response.data.list
        this.pagination.total = response.data.total
        this.tableLoading = false
      }).catch(error => {
        console.log(error)
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scoped>
</style>

