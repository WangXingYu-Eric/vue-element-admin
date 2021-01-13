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
    <el-divider content-position="left">内部分户账户信息</el-divider>
    <div class="filter-container">
      <el-form ref="form2" :model="filter2" :rules="rules2" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="120px" label="明细科目编号:" prop="b">
              <el-input v-model="filter2.b" :placeholder="'请输入明细科目编号'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="120px" label="明细科目名称:" prop="c">
              <el-input v-model="filter2.c" :placeholder="'请输入明细科目名称'" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="120px" label="客户统一编号:" prop="d">
              <el-input v-model="filter2.d" :placeholder="'请输入客户统一编号'" clearable />
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
      <el-table-column prop="jrxkzh" label="金融许可证号" align="center" min-width="130" />
      <el-table-column prop="jgdm" label="机构代码" align="center" min-width="130" />
      <el-table-column prop="nbjgh" label="内部机构号" align="center" min-width="130" />
      <el-table-column prop="a" label="内部分户账账号" align="center" min-width="130" />
      <el-table-column prop="b" label="明细科目编号" align="center" min-width="130" />
      <el-table-column prop="c" label="明细科目名称" align="center" min-width="130" />
      <el-table-column prop="d" label="客户统一编号" align="center" min-width="130" />
      <el-table-column prop="e" label="借方余额" align="center" min-width="130" />
      <el-table-column prop="f" label="贷方余额" align="center" min-width="130" />
      <el-table-column prop="g" label="币种" align="center" min-width="130" />
      <el-table-column prop="h" label="利率" align="center" min-width="130" />
      <el-table-column prop="i" label="开户日期" align="center" min-width="130" />
      <el-table-column prop="j" label="核心交易流水号" align="center" min-width="130" />
      <el-table-column prop="k" label="核心交易日期" align="center" min-width="130" />
      <el-table-column prop="l" label="交易金额" align="center" min-width="130" />
      <el-table-column prop="m" label="对方户名" align="center" min-width="130" />
      <el-table-column prop="n" label="对方账号" align="center" min-width="130" />
      <el-table-column prop="o" label="对方科目编号" align="center" min-width="130" />
      <el-table-column prop="p" label="对方科目名称" align="center" min-width="130" />
      <el-table-column prop="q" label="冲补抹标志" align="center" min-width="130" />
      <el-table-column prop="r" label="交易借贷标志" align="center" min-width="130" />
    </el-table>
    <pagination v-show="pagination2.total>0" :total="pagination2.total" :page.sync="pagination2.page" :limit.sync="pagination2.limit" class="float-right" @pagination="fetchList2()" />

  </div>
</template>

<script>

import Pagination from '@/components/Pagination/index'
import { fetchList1, fetchList2 } from '@/api/demo/data-maintenance/entrustedInvestment'

export default {
  name: 'EntrustedInvestmentIndex',
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

