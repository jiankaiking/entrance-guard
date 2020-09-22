<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="100px">
        <el-form-item label="发布机构">
          <el-select v-model="searchData.organId" placeholder="选择机构">
            <el-option
              v-for="(item,index) in organArr.children"
              :key="index"
              :value="item.organId"
              :label="item.organName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <CommonSelect :value.sync="searchData.newsType" type="news_notice_type" />
        </el-form-item>
        <el-form-item style="vertical-align: top" label="发布时间" label-width="100px">
          <el-col :span="10">
            <el-date-picker
              v-model="searchData.createStartTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" style="text-align: center">至</el-col>
          <el-col :span="10">
            <el-date-picker
              v-model="searchData.createEndTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button plain @click="searchReset">重置</el-button>
          <el-button type="success" plain @click="headAdd(1)">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table
          v-loading="loading"
          empty-text
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          :header-row-style="{color:'#000000'}"
          :data="tableData"
          border
          style="width: 99%;"
        >
          <el-table-column align="center" prop="subject" label="发布主题" />
          <el-table-column align="center" prop="organName" label="发布机构" />
          <el-table-column align="center" prop="createTime" label="发布时间" />
          <el-table-column align="center" prop="newsType" label="消息类型" />
          <el-table-column align="center" prop="content" label="发布内容" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="headEdit(scope.row)">详情</el-button>
              <el-popconfirm title="确定删除这条数据吗？" @onConfirm="headDelete(scope.row)">
                <el-button slot="reference" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
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
    <el-dialog :lock-scroll="false" title="活动详情" center width="50%" :visible.sync="dialogTableVisible">
      <AnnouncementModel ref="modalForm" @close="modalClose" @ok="modalFormOk" />
    </el-dialog>
  </div>
</template>

<script>
import { myMixins } from '../../mixins/mixin'
import CommonSelect from '../../components/select/CommonSelect'
import AnnouncementModel from './moduleModel/AnnouncementModel'
import httpRequest from '../../api/api'

export default {
  name: 'Agentchildlist',
  components: {
    AnnouncementModel,
    CommonSelect
  },
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        createStartTime: '', // 活动开始时间
        createEndTime: '', // 活动结束时间
        subject: '', // 主题
        newsModule: '1', // 消息所属模块 1 公告 2 商户活动 3 代理商活动
        status: '', // 活动状态
        newsType: '', // 消息类型
        size: 10,
        organId: '',
        currentPage: 1
      },
      organArr: [],
      total: 0,
      dialogTableVisible: false,
      tableData: [],
      listUrl: '/managecenter/ad/news/center/list' // 表格数据接口
    }
  },
  mounted() {
    this.getAllOrgan()
  },
  methods: {
    // 获取所有机构
    getAllOrgan() {
      httpRequest('/managecenter/organManage/getOrganDownTree', 'get')
        .then(res => {
          if (res.success) {
            this.organArr = res.data
          }
        })
    },

    headAdd(type) {
      this.$router.push({ path: '/activeadd', query: { type: type }})
    },
    searchReset() {
      this.searchData.subject = ''
      this.searchData.createStartTime = ''
      this.searchData.createEndTime = ''
      this.searchData.status = ''
      this.searchData.newsType = ''
      console.log(1)
      this.getTableData()
    },
    headDelete(row) {
      httpRequest('/managecenter/ad/news/center/update', 'POST', { id: row.id })
        .then(res => {
          this.$message.success(res.msg)
          this.getTableData()
        })
    }
  }

}
</script>

<style scoped>
</style>
