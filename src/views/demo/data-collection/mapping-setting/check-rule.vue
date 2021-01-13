<template>
  <div class="page-container">
    <div class="filter-container">
      <el-form ref="form" :model="filter" :rules="rules" class="form-container" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" class="float-right">
            <el-button type="danger" icon="fa fa-trash-o" circle title="规则删除" class="float-right ml-10" @click.stop="()=>{}" />
            <el-button type="primary" icon="fa fa-edit" circle title="规则修改" class="float-right" @click.stop="()=>{}" />
            <el-button type="success" icon="fa fa-plus" circle title="规则增加" class="float-right" @click.stop="()=>{}" />
            <el-button type="info" icon="fa fa-pause" circle title="停用" class="float-right ml-10" @click.stop="()=>{}" />
            <el-button type="primary" icon="fa fa-check" circle title="启用" class="float-right" @click.stop="()=>{}" />
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table ref="table1" v-loading="tableLoading" :data="tableData" row-key="id" stripe highlight-current-row class="width-100">
      <el-table-column type="selection" min-width="80" />
      <el-table-column prop="columnField" label="字段名称" align="center" min-width="200" />
      <el-table-column prop="rule" label="条件" align="center" min-width="200" />
      <el-table-column prop="value" label="值" align="center" min-width="200" />
    </el-table>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination/index'
export default {
  name: 'MappingSettingEdit',
  components: { /* Pagination*/ },
  data() {
    return {
      filter: {},
      rules: {},
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
    this.tableData = [
      {
        columnField: this.$route.params.sourceColumnField,
        rule: '不等于',
        value: 'NULL'
      },
      {
        columnField: this.$route.params.sourceColumnField,
        rule: '大于',
        value: '10000'
      }
    ]
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

