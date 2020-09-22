<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="80px">
        <el-form-item label="设备名称" style="width: 220px">
          <el-input v-model="searchData.loginUserName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column type="index" width="200" align="center" label="序号" />
          <el-table-column prop="loginOrganName" label="设备编号" align="center" />
          <el-table-column prop="loginClientIp" align="center" label="设备名称" />
          <el-table-column prop="loginStatus" align="center" label="设备型号" />
          <el-table-column prop="loginClientIp" align="center" label="所在位置" />
          <el-table-column prop="loginStatus" align="center" label="报警事件" />
          <el-table-column prop="loginClientIp" align="center" label="报警情况" />
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :page-size="searchData.size"
          :total="total"
          layout=" sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { myMixins } from '../../mixins/mixin'

export default {
  name: 'ControlInfo',
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        loginUserName: '',
        loginClientIp: '',
        startDate: '',
        endDate: '',
        loginStatus: '',
        page: 1,
        size: 10
      },
      dateValue: '',
      total: 0,
      listUrl: '/managecenter/log/getSysLoginLog',
      tableData: []
    }
  }
}
</script>

<style>

</style>
