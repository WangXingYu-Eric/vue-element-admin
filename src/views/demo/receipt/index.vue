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
            <el-button type="success" icon="fa fa-sign-in" circle title="导入存档" class="float-right ml-10" />
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
      rules1: {
      },
      tableData1: [],
      tableLoading1: false,
      pagination1: {
        page: 1,
        limit: 10,
        total: 10
      }

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
    }
  }
}
</script>

<style scoped>
</style>

