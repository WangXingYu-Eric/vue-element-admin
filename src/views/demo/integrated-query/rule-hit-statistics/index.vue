<template>
  <div class="page-container">
    <el-divider content-position="left">综合查询</el-divider>
    <div class="filter-container">
      <el-form ref="form1" :model="filter1" :rules="rules1" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="投保单号" label-width="110px">
              <el-input v-model="filter1.name" class="filter-item" placeholder="投保单号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="起始审单日期" label-width="110px">
              <el-date-picker
                v-model="filter1.fiveYearDateStart"
                style="width:100%;min-width:135px"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="起始审单日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="终止审单日期" label-width="110px">
              <el-date-picker
                v-model="filter1.fiveYearDateEnd"
                style="width:100%;min-width:135px"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="终止审单日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="首检初始日期" label-width="110px">
              <el-date-picker
                v-model="filter1.yearDateStart"
                style="width:100%;min-width:135px"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="首检初始日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="首检结束日期" label-width="110px">
              <el-date-picker
                v-model="filter1.yearDateEnd"
                style="width:100%;min-width:135px"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="首检结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="初始投保日期" label-width="110px">
              <el-date-picker
                v-model="filter1.buyDateStart"
                style="width:100%;min-width:135px"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="初始投保日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="投保结束日期" label-width="110px">
              <el-date-picker
                v-model="filter1.buyDateEnd"
                style="width:100%;min-width:135px"
                class="filter-item"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="投保结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="110px" label="模型编码:" prop="reportType">
              <el-select v-model="filter1.reportType" :placeholder="'请选模型编码'" clearable class="width-100">
                <el-option :key="'1'" :label="'集中采集'" :value="'集中采集'" />
                <el-option :key="'2'" :label="'持续采集'" :value="'持续采集'" />
              </el-select>
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
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" min-width="50" />
      <el-table-column prop="jobNumber" label="职场名称" align="center" min-width="100" />
      <el-table-column prop="batchNumber" label="投保单号" align="center" min-width="100" />
      <el-table-column prop="dataStartTime" label="投保日期" align="center" min-width="100" />
      <el-table-column prop="dataEndTime" label="首检日期" align="center" min-width="100" />
      <el-table-column prop="dataProcessTime" label="审单日期" align="center" min-width="110" />
      <el-table-column prop="dataRange" label="产品名称" align="center" min-width="100" />
      <el-table-column prop="jobType" label="模型名称" align="center" min-width="100" />
      <el-table-column prop="majorJob" label="模型编号" align="center" min-width="100" />
      <el-table-column prop="reportStatus" label="模型结果" align="center" min-width="130" />
      <el-table-column prop="jobNumber" label="错误报告人" align="center" min-width="100" />
      <el-table-column prop="batchNumber" label="误判原因" align="center" min-width="100" />
      <el-table-column prop="jobType" label="详细描述" align="center" min-width="100" />
    </el-table>
    <pagination v-show="pagination1.total>0" :total="pagination1.total" :page.sync="pagination1.page" :limit.sync="pagination1.limit" class="float-right" @pagination="fetchList1()" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList1, fetchList2 } from '@/api/demo/data-maintenance/dongjiangao'

export default {
  name: 'RuleHitStatistics',
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
