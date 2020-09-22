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
          <el-input v-model="searchData.buildingName" placeholder="楼号" />
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.unitName" placeholder="单元" />
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.roomToward" placeholder="朝向" />
        </el-form-item>
        <el-form-item label-width="20px" style="width: 220px">
          <el-input v-model="searchData.roomType" placeholder="房屋类型" />
        </el-form-item>
        <el-form-item label-width="20px" style="width: 220px">
          <el-input v-model="searchData.roomNo" placeholder="房间号" />
        </el-form-item>
        <el-button type="primary" style="margin-left: 15px" plain @click="searchClick">查询</el-button>
        <el-button type="success" plain @click="addRoom">新增</el-button>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column type="index" align="center" label="序号" width="50" />
          <el-table-column prop="communityName" align="center" label="小区名称" />
          <el-table-column prop="buildingName" label="楼号" align="center" />
          <el-table-column prop="unitName" align="center" label="单元" />
          <el-table-column prop="roomNo" align="center" label="房间号" width="90" />
          <el-table-column prop="buildingType" label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.buildingType | getBuildingType }}
            </template>
          </el-table-column>
          <el-table-column prop="roomType" align="center" label="房屋类型" />
          <el-table-column prop="roomArea" align="center" label="建筑面积（平方米）" />
          <el-table-column prop="roomToward" align="center" label="朝向" />
          <el-table-column prop="faceCount" align="center" label="人脸录入" width="80" />
          <el-table-column prop="icCount" width="80" align="center" label="ic卡" />
          <el-table-column prop="ownerCount" width="80" align="center" label="业主">
            <template slot-scope="scope">
              {{ scope.row.status | getVisitStatus }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 0" type="text" @click="goInfo(scope.row.id)">添加业主</el-button>
              <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="info(scope.row)">详情</el-button>
              <el-button type="text" @click="writerCard(scope.row.id)">ic卡写入</el-button>
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
    <roomInfo ref="roomInfo" />
    <addRoomModel ref="modelForm" @ok="searchClick" />
    <el-dialog :lock-scroll="false" width="60%" title="ic卡写入" @close="modalClose" center :visible.sync="dialogTableVisible">
      <writeCardModel ref="writeCardModel" @close="modalClose" @ok="modalFormOk" />
    </el-dialog>
  </div>
</template>

<script>
import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
import addRoomModel from '@/views/Community/roomModel/addRoomModel'
import roomInfo from '@/views/Community/roomModel/roomInfo'
import writeCardModel from '@/views/Community/roomModel/writeCardModel'
export default {
  name: 'RoomList',
  components: {
    roomInfo,
    writeCardModel,
    addRoomModel
  },
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        communityId: '',
        buildingName: '',
        unitName: '',
        roomNo: '',
        roomToward: '',
        roomType: '',
        currentPage: 1,
        size: 10
      },
      dialogTableVisible: false,
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
      listUrl: '/property-manage/community/room/info/page',
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
    writerCard(id) {
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.writeCardModel.Connect(id)
      })
    },
    info(row) {
      this.$refs.roomInfo.getInfo(row)
    },
    addRoom() {
      this.$refs.modelForm.add()
    },
    goEdit(row) {
      this.$refs.modelForm.edit(row)
    },
    goInfo(id) {
      this.$router.push(`/visit/invited?id=${id}`)
    },
    modalClose() {
      // console.log(123)
      this.dialogTableVisible = false
      this.$refs.writeCardModel.unLink()
    }
  }

}
</script>

<style>

</style>
