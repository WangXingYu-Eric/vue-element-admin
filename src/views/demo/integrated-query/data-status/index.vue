<template>
  <div class="page-container">
    <el-divider content-position="left">综合查询</el-divider>
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
            <el-form-item label-width="90px" label="数据年度:" prop="dataYear">
              <el-date-picker v-model="filter1.dataYear" align="right" type="year" format="yyyy" placeholder="请选择数据年度" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="数据月份:" prop="dataMonth">
              <el-date-picker v-model="filter1.dataMonth" align="right" type="month" format="yyyy-MM" placeholder="请选择数据月份" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="success" icon="fa fa-sticky-note-o" circle title="查看校验明细" class="float-right ml-10" @click="seeMore" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter1" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider content-position="left">综合查询列表</el-divider>
    <el-table ref="table1" v-loading="tableLoading1" :data="tableData1" row-key="id" stripe highlight-current-row class="tableSelect width-100" @selection-change="handleSelectionChange" @current-change="chooseMcaterialChange">
      <el-table-column type="selection" min-width="80" />
      <el-table-column type="index" label="序号" min-width="80" />
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
    <edit :title="edit.title" :visible="edit.visible" :type="edit.type" :model="edit.model" @setEditVisible="setEditVisible" @queryList="handleFilter1" />
    <div class="clearfix" />
    <el-divider content-position="left">数据抽取状态</el-divider>
    <div class="filter-container">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList1, fetchList2 } from '@/api/demo/data-maintenance/dongjiangao'
import BarChart from '@/views/demo/integrated-query/report-problem-summary/components/BarChart'
import Edit from './edit'
export default {
  name: 'DataStatusIndex',
  components: { Pagination, Edit, BarChart },
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
      edit: {
        title: '',
        visible: false,
        type: '',
        model: {}
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
      },
      multipleSelection: []
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
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.table1.clearSelection()
        this.$refs.table1.toggleRowSelection(val.pop())
      }
      this.multipleSelection = val
    },
    chooseMcaterialChange(val) {
      this.$refs.table1.toggleRowSelection(val)
    },
    seeMore() {
      this.edit.title = '明细'
      this.setEditVisible(true)
      this.edit.type = 'insert'
      this.edit.model = {}
    },
    goDoStatus() {
      this.$router.push('/demo/integrated-query/data-status/index')
    },
    goAmountStatus() {
      this.$router.push('/demo/integrated-query/data-status/index')
    },
    goPreserveStatus() {
      this.$router.push('/demo/integrated-query/maintenance-status/index')
    },
    goCheckStatus() {
      this.$router.push('/demo/integrated-query/check-status/index')
    },
    goAuditStatus() {
      this.$router.push('/demo/integrated-query/audit-status/index')
    },
    setEditVisible(value) { // 设置编辑框是否可见
      this.edit.visible = value
    }
  }
}
</script>
<style>
  .tableSelect .el-table__header-wrapper .el-checkbox {
    display: none
  }
  .active{
    background:#0000ff;
  }
</style>

