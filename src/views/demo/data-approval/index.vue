<template>
  <div class="page-container">
    <el-divider content-position="left">数据上报审批</el-divider>
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
            <el-button type="success" icon="fa fa-sign-out" circle title="质量审核结果导出" class="float-right ml-10" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click="handleFilter1" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider content-position="left">审批作业清单</el-divider>
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
      <el-table-column prop="dataProcessTime" label="处理时间" align="center" min-width="140" />
      <el-table-column label="操作" align="center" fixed="right" min-width="105">
        <template slot-scope="{row}">
          <el-button native-type icon="fa fa-pencil-square-o" circle title="部门审核意见" @click="seeMore(row)" />
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="pagination1.total>0" :total="pagination1.total" :page.sync="pagination1.page" :limit.sync="pagination1.limit" class="float-right" @pagination="fetchList1()" />
    <edit :title="edit.title" :visible="edit.visible" :type="edit.type" :model="edit.model" @setEditVisible="setEditVisible" @queryList="handleFilter1" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination/index'
  import { fetchList1 } from '@/api/demo/data-maintenance/dongjiangao'
  import Edit from './edit'
  export default {
    name: 'DataApprovalIndex',
    components: { Pagination,Edit },
    data() {
      return {
        filter1: {
          reportType: '',
          dataYear: '',
          dataMonth: ''
        },
        rules1: {
        },
        edit: {
          title: '',
          visible: false,
          type: '',
          model: {}
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
      seeMore(row) {
        this.edit.title = '各部门审核结果'
        this.setEditVisible(true)
        this.edit.type = 'insert'
        this.edit.model = {}
      },
      setEditVisible(value) { // 设置编辑框是否可见
        this.edit.visible = value
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

