<template>
  <div class="page-container">
    <el-divider content-position="left">源数据采集</el-divider>
    <div class="filter-container">
      <el-form ref="queryForm" :model="filter" :rules="queryRules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="报送方式:" prop="reportType">
              <el-select v-model="filter.reportType" :placeholder="'请选择报送方式'" clearable class="width-100">
                <el-option :key="'1'" :label="'集中采集'" :value="'集中采集'" />
                <el-option :key="'2'" :label="'持续采集'" :value="'持续采集'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="数据年度:" prop="dataYear">
              <el-date-picker v-model="filter.dataYear" align="right" type="year" format="yyyy" placeholder="请选择数据年度" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="数据月份:" prop="dataMonth">
              <el-date-picker v-model="filter.dataMonth" align="right" type="month" format="yyyy-MM" placeholder="请选择数据月份" class="width-100" />
            </el-form-item>
          </el-col>
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
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="primary" icon="fa fa-hourglass-end" circle title="系统采集完成" class="float-right ml-10" @click.stop="handleFilter" />
            <el-button type="primary" icon="fa fa-sticky-note-o" circle title="查看校验明细" class="float-right" @click.stop="handleFilter" />
            <el-button type="primary" icon="fa fa-hand-lizard-o" circle title="全表采集" class="float-right" @click.stop="handleFilter" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider content-position="left">待提数任务列表</el-divider>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="80" />
      <el-table-column type="index" label="序号" min-width="80" />
      <el-table-column prop="jobNumber" label="任务号" align="center" min-width="100" />
      <el-table-column prop="batchNumber" label="批次号" align="center" min-width="100" />
      <el-table-column prop="reportStatus" label="上报状态" align="center" min-width="110" />
      <el-table-column prop="dataRange" label="数据区间" align="center" min-width="100" />
      <el-table-column prop="dataStartTime" label="数据起始日期" align="center" min-width="100" />
      <el-table-column prop="dataEndTime" label="数据截止日期" align="center" min-width="100" />
      <el-table-column prop="dataProcessTime" label="处理时间" align="center" min-width="130" />
    </el-table>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList" />
    <div class="clearfix" />
    <el-divider content-position="left">单表采集</el-divider>
    <el-form ref="collectionForm" :model="collection" :rules="collectionRule" class="form-container" @submit.native.prevent>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="业务表:" prop="reportArea">
            <el-select v-model="collection.tableName" :placeholder="'请选择业务表'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'总账会计全科表'" :value="'总账会计全科表'" />
              <el-option :key="'2'" :label="'自主投资交易流水表'" :value="'自主投资交易流水表'" />
              <el-option :key="'3'" :label="'自主投资账户持仓明细表'" :value="'自主投资账户持仓明细表'" />
              <el-option :key="'4'" :label="'自主投资账户信息汇总表'" :value="'自主投资账户信息汇总表'" />
              <el-option :key="'5'" :label="'银行账户信息表'" :value="'银行账户信息表'" />
              <el-option :key="'6'" :label="'手续费及佣金分科目明细表'" :value="'手续费及佣金分科目明细表'" />
              <el-option :key="'7'" :label="'业务及管理费分科目明细表'" :value="'业务及管理费分科目明细表'" />
              <el-option :key="'8'" :label="'财务凭证信息表'" :value="'财务凭证信息表'" />
              <el-option :key="'9'" :label="'内部科目对照表'" :value="'内部科目对照表'" />
              <el-option :key="'10'" :label="'董监高履职信息表'" :value="'董监高履职信息表'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" class="float-right">
          <el-button type="primary" icon="fa fa-hand-lizard-o" circle title="单表采集" class="float-right" @click.stop="()=>{}" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList } from '@/api/demo/data-collection/default'
export default {
  name: 'DataCollectionIndex',
  components: { Pagination },
  data() {
    return {
      filter: {
        reportType: '',
        dataYear: '',
        dataMonth: ''
      },
      queryRules: {
      },
      tableData: [],
      tableLoading: false,
      pagination: {
        page: 1,
        limit: 10,
        total: 10
      },
      collection: {
        tableName: ''
      },
      collectionRule: {

      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.tableLoading = true
      fetchList(this.filter, this.pagination).then(response => {
        this.tableData = response.data.list
        this.pagination.total = response.data.total
        this.tableLoading = false
      }).catch(error => {
        console.log(error)
        this.tableLoading = false
      })
    },
    handleFilter() {
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          this.fetchList()
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

