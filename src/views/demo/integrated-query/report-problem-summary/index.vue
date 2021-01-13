<template>
  <div class="page-container">
    <el-divider content-position="left">单次上报数据区间趋势图</el-divider>
    <el-form ref="queryForm" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
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
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="分公司:" prop="reportGroup">
            <el-select v-model="filter.reportGroup" :placeholder="'请选择分分公司'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'浙江分公司'" :value="'浙江分公司'" />
              <el-option :key="'2'" :label="'大连分公司'" :value="'大连分公司'" />
              <el-option :key="'3'" :label="'送公司'" :value="'送公司'" />
              <el-option :key="'4'" :label="'宁波分公司'" :value="'宁波分公司'" />
              <el-option :key="'5'" :label="'上海分公司'" :value="'上海分公司'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" class="float-right">
          <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
        </el-col>
      </el-row>
    </el-form>
    <div class="filter-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>
    </div>
    <div class="clearfix" />
    <el-divider content-position="left">校验规则维度统计</el-divider>
    <el-form ref="queryForm" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
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
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="分公司:" prop="reportGroup">
            <el-select v-model="filter.reportGroup" :placeholder="'请选择分分公司'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'浙江分公司'" :value="'浙江分公司'" />
              <el-option :key="'2'" :label="'大连分公司'" :value="'大连分公司'" />
              <el-option :key="'3'" :label="'送公司'" :value="'送公司'" />
              <el-option :key="'4'" :label="'宁波分公司'" :value="'宁波分公司'" />
              <el-option :key="'5'" :label="'上海分公司'" :value="'上海分公司'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" class="float-right">
          <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
        </el-col>
      </el-row>
    </el-form>
    <div class="filter-container">
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <raddar-chart />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="clearfix" />
    <el-divider content-position="left">分公司上报问题统计</el-divider>
    <el-form ref="queryForm" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
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
        <el-col :xs="24" :sm="12" :md="8">
          <el-form-item label-width="90px" label="分公司:" prop="reportGroup">
            <el-select v-model="filter.reportGroup" :placeholder="'请选择分分公司'" clearable style="width: 100%">
              <el-option :key="'1'" :label="'浙江分公司'" :value="'浙江分公司'" />
              <el-option :key="'2'" :label="'大连分公司'" :value="'大连分公司'" />
              <el-option :key="'3'" :label="'送公司'" :value="'送公司'" />
              <el-option :key="'4'" :label="'宁波分公司'" :value="'宁波分公司'" />
              <el-option :key="'5'" :label="'上海分公司'" :value="'上海分公司'" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" class="float-right">
          <el-button type="primary" icon="fa fa-search" circle title="查询" class="float-right" @click.stop="handleFilter" />
        </el-col>
      </el-row>
    </el-form>
    <div class="filter-container">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
      </el-row>
    </div>
    <!--    <div class="clearfix" />-->
    <!--    <el-divider content-position="left">质检点总量统计</el-divider>-->
    <!--    <div class="filter-container">-->
    <!--      <el-row>-->
    <!--        <el-col :xs="24" :sm="24" :lg="24">-->
    <!--          <div class="chart-wrapper">-->
    <!--            <bar-chart />-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </div>-->
  </div>
</template>

<script>

import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'ReportProblemSummary',
  components: {
    // GithubCorner,
    // PanelGroup,
    LineChart,
    RaddarChart,
    PieChart
    // BarChart
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      filter: {
        reportType: '',
        dataYear: '',
        dataMonth: '',
        reportGroup: ''
      },
      rules: {

      },
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleFilter() {},
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

