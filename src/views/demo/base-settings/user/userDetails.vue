<template>
  <div style="width: 768px;">
    <el-form label-position="left" inline class="table-expand">
      <el-row>
        <el-col :sm="12" :lg="8">
          <el-form-item label="性别">
            <span>{{ userDetails.gender?'女':'男' }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-form-item label="出生日期">
            <span>{{ userDetails.birthday?userDetails.birthday:'无' }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-form-item label="入职日期">
            <span>{{ userDetails.entryDate?userDetails.entryDate:'无' }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-form-item label="工号">
            <span>{{ userDetails.workCode? userDetails.workCode:'无' }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-form-item label="工作岗位">
            <span>{{ userDetails.operatingPost?userDetails.operatingPost:'无' }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-form-item label="直属领导">
            <span>{{ getName('dict_user',userDetails.leader) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    userDetails: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-bottom: 0;
  }
</style>
