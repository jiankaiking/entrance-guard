<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="80px">
        <el-form-item label="事件" style="width: 220px">
          <el-input v-model="searchData.loginUserName" placeholder="请输入事件名称" />
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button plain @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column type="index" width="50" align="center" label="序号" />
          <el-table-column prop="event" align="center" label="事件" />
          <el-table-column prop="createTime" label="发生时间" align="center" />
          <el-table-column prop="operUser" align="center" label="操作人" />
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
  name: 'QuipmentLog',
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        event: '',
        startDate: '',
        endDate: '',
        page: 1,
        size: 10
      },
      dateValue: '',
      total: 0,
      listUrl: '/managecenter/log/getEquipmentLogList',
      tableData: []
    }
  },
  watch: {
    'searchData.startDate'(val, old) {
      if (val === '') {
        this.dateValue = ''
      }
    }
  },

  mounted() {

  },
  methods: {
    changeDate(e) {
      if (e) {
        this.searchData.startDate = e[0]
        this.searchData.endDate = e[1]
      } else {
        this.searchData.startDate = ''
        this.searchData.endDate = ''
      }
    }
  }

}
</script>
