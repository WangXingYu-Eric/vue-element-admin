<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="报送频率:" prop="a">
              <el-select v-model="filter.a" :placeholder="'请选择报送频率'" clearable class="width-100">
                <el-option :key="'1'" :label="'每天'" :value="'每天'" />
                <el-option :key="'2'" :label="'每月'" :value="'每月'" />
                <el-option :key="'3'" :label="'每年'" :value="'每年'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报状态:" prop="d">
              <el-select v-model="filter.d" :placeholder="'请选择上报状态'" clearable class="width-100">
                <el-option :key="'1'" :label="'人工维护中'" :value="'人工维护中'" />
                <el-option :key="'2'" :label="'待人工维护'" :value="'待人工维护'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报年度:" prop="dataYear">
              <el-date-picker v-model="filter.dataYear" align="right" type="year" format="yyyy" placeholder="请选择数据年度" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label-width="90px" label="上报月份:" prop="dataMonth">
              <el-date-picker v-model="filter.dataMonth" align="right" type="month" format="yyyy-MM" placeholder="请选择数据月份" class="width-100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="danger" icon="fa fa-trash-o" circle title="删除" class="float-right ml-10" @click.stop="()=>{}" />
            <el-button type="success" icon="fa fa-plus" circle title="增加" class="float-right" @click.stop="()=>{}" />
            <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="80" />
      <el-table-column type="index" label="序号" align="center" min-width="80" />
      <el-table-column prop="a" label="数据区间" align="center" min-width="150" />
      <el-table-column prop="d" label="上报状态" align="center" min-width="150" />
      <el-table-column prop="b" label="作业编号" align="center" min-width="110" />
      <el-table-column prop="c" label="处理时间" align="center" min-width="110" />
    </el-table>
    <el-button id="1" slot="trigger" size="small" type="primary">数据质量校验</el-button>
    <el-button id="2" slot="trigger" size="small" type="primary">校验结果核对</el-button>
    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" class="float-right" @pagination="fetchList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/demo/data-check/data-checkOne'
import Pagination from '@/components/Pagination'
export default {
  name: 'DataCheckOneIndex',
  components: { Pagination },
  data() {
    return {
      filter: {
        groupName: '',
        tableName: ''
      },
      rules: {
      },
      tableData: [],
      tableLoading: false,
      pagination: {
        page: 1,
        limit: 10,
        total: 10
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
      this.$refs.form.validate(valid => {
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

