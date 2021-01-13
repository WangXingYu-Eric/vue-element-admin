<template>
  <div class="page-container">
    <el-divider content-position="left">待维护任务列表</el-divider>
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
            <el-button type="primary" icon="fa fa-sticky-note-o" circle title="查看校验明细" class="float-right ml-10" @click.stop="handleFilter1" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter1" />
          </el-col>
        </el-row>
      </el-form>
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
    <el-divider content-position="left">机构信息信息列表</el-divider>
    <div class="filter-container">
      <el-form ref="form2" :model="filter2" :rules="rules2" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="机构名称:" prop="name">
              <el-input v-model="filter2.jrjgmc" :placeholder="'请输入金融机构名称'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="机构代码:" prop="jgdm">
              <el-input v-model="filter2.jgdm" :placeholder="'请输入机构代码'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="内部机构号:" prop="nbjgh">
              <el-input v-model="filter2.nbjgh" :placeholder="'请输入内部机构号'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-edit" circle title="修改" class="float-right ml-10" @click.stop="()=>{}" />
            <el-button type="success" icon="fa fa-plus" circle title="增加" class="float-right" @click.stop="()=>{}" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter2" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table2" v-loading="tableLoading2" :data="tableData2" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="50" />
      <el-table-column type="index" label="序号" min-width="50" />
      <el-table-column prop="jrjgmc" label="金融机构名称" align="center" min-width="130" />
      <el-table-column prop="qqfrsbm" label="全球法人识别编码" align="center" min-width="150" />
      <el-table-column prop="jgdm" label="机构代码" align="center" min-width="130" />
      <el-table-column prop="nbjgh" label="内部机构号" align="center" min-width="130" />
      <el-table-column prop="sjgljgdm" label="上级管理机构代码" align="center" min-width="150" />
      <el-table-column prop="sjgljgmc" label="上级管理机构名称" align="center" min-width="150" />
      <el-table-column prop="clsj" label="成立时间" align="center" min-width="130" />
      <el-table-column prop="yysj" label="营业状态" align="center" min-width="130" />
      <el-table-column prop="zcdq" label="注册地区" align="center" min-width="130" />
      <el-table-column prop="zcdz" label="注册地址" align="center" min-width="130" />
      <el-table-column prop="zczb" label="注册资本" align="center" min-width="130" />
      <el-table-column prop="yzbm" label="邮政编码" align="center" min-width="130" />
      <el-table-column prop="frxm" label="法定代表人姓名" align="center" min-width="130" />
      <el-table-column prop="zyfzrxm" label="主要负责人姓名" align="center" min-width="130" />

    </el-table>
    <pagination v-show="pagination2.total>0" :total="pagination2.total" :page.sync="pagination2.page" :limit.sync="pagination2.limit" class="float-right" @pagination="fetchList2()" />

  </div>
</template>

<script>

import Pagination from '@/components/Pagination/index'
import { fetchList1, fetchList2 } from '@/api/demo/data-maintenance/branch'

export default {
  name: 'BranchIndex',
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
  }
}
</script>

<style scoped>
</style>

