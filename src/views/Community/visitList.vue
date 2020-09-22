<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="30px">
        <el-form-item label-width="20px" style="width: 220px">
          <el-select
            v-model="searchData.communityId"
            clearable
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            placeholder="请选择小区名称"
          >
            <el-option
              v-for="item in communityArr"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.visitorName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.visitorPhone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.visitorCarNo" placeholder="请输入访客车牌号" />
        </el-form-item>
        <el-form-item label-width="20px" style="width: 220px">
          <el-select v-model="searchData.status" placeholder="请选择状态">
            <el-option v-for="(item,i) in statusArr" :key="i" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button type="success" plain @click="go">访客邀请</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column prop="visitorName" align="center" label="姓名" />
          <el-table-column prop="visitorPhone" label="联系电话" align="center" />
          <el-table-column prop="communityName" align="center" label="到访小区" />
          <el-table-column prop="visitorCarNo" align="center" label="车牌号" width="90" />
          <el-table-column prop="reason" label="事由" align="center" />
          <el-table-column prop="startTime" align="center" label="开始时间">
            <template slot-scope="scope">
              {{ scope.row.startTime | getTime }}
            </template>
          </el-table-column>
          <el-table-column prop="startTime" align="center" label="进入时间">
            <template slot-scope="scope">
              {{ scope.row.startTime | getTime }}
            </template>
          </el-table-column>
          <el-table-column prop="endTime" align="center" label="离开时间">
            <template slot-scope="scope">
              {{ scope.row.endTime | getTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="人脸照片" width="80">
            <template slot-scope="scope">
              <el-image :src="scope.row.visitorFaceImgUrl" :preview-src-list="[scope.row.visitorFaceImgUrl]" />
            </template>
          </el-table-column>
          <el-table-column prop="loginStatus" width="80" align="center" label="登记平台" />
          <el-table-column prop="status" width="80" align="center" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status | getVisitStatus }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" align="center" label="操作日期">
            <template slot-scope="scope">
              {{ scope.row.createTime | getTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 0" type="text" @click="goInfo(scope.row.id)">审核</el-button>
              <el-button type="text" @click="goInfo(scope.row.id)">查看</el-button>
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
  </div>
</template>

<script>
import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
export default {
  name: 'VisitList',
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        communityId: '',
        visitorName: '',
        visitorPhone: '',
        visitorCarNo: '',
        status: '',
        currentPage: 1,
        size: 10
      },
      communityArr: [],
      statusArr: [
        { label: '全部', value: '' },
        { label: '待审核', value: '0' },
        { label: '待进入', value: '1' },
        { label: '已失效', value: '2' },
        { label: '已进入', value: '3' },
        { label: '已离开', value: '4' },
        { label: '驳回', value: '5' }
      ],
      total: 0,
      selectUrl: '/property-manage/community/info/list',
      listUrl: '/property-manage/community/visitor/info/page',
      tableData: []
    }
  },

  mounted() {
    this.remoteMethod('')
  },
  methods: {
    remoteMethod(query) {
      httpRequest(this.selectUrl, 'GET', { communityName: query }).then(res => {
        this.communityArr = res.data
      })
    },
    go() {
      this.$router.push('/visit/invited')
    },
    goInfo(id) {
      this.$router.push(`/visit/invited?id=${id}`)
    }
  }

}
</script>

<style>

</style>
