<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="30px">
        <el-form-item label-width="20px"  style="width: 220px">
          <el-select v-model="searchData.communityId" clearable  filterable remote reserve-keyword
                     :remote-method="remoteMethod"  placeholder="请选择小区名称">
            <el-option
                v-for="item in communityArr"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.visitorName"   placeholder="楼号"></el-input>
        </el-form-item>
        <el-form-item  style="width: 220px">
          <el-input v-model="searchData.visitorPhone"   placeholder="单元"></el-input>
        </el-form-item>
        <el-form-item  style="width: 220px">
          <el-input v-model="searchData.visitorCarNo"   placeholder="朝向"></el-input>
        </el-form-item>
        <el-form-item label-width="20px"  style="width: 220px">
          <el-select v-model="searchData.status" placeholder="房屋类型">
            <el-option :label="item.label" v-for="item in statusArr" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">查询</el-button>
          <el-button type="success" @click="go" plain>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table :data="tableData" border empty-text style="width: 100%" v-loading="loading">
          <el-table-column type="index" align="center"  label="序号" width="50"></el-table-column>
          <el-table-column prop="visitorName" align="center" label="小区名称"></el-table-column>
          <el-table-column prop="visitorPhone" label="楼号" align="center"></el-table-column>
          <el-table-column prop="communityName" align="center" label="单元"></el-table-column>
          <el-table-column prop="visitorCarNo" align="center" label="房间号" width="90"></el-table-column>
          <el-table-column prop="reason" label="类型" align="center"></el-table-column>
          <el-table-column prop="visitorName" align="center" label="房屋类型"></el-table-column>
          <el-table-column prop="visitorName" align="center" label="建筑面积（平方米）">
          </el-table-column>
          <el-table-column prop="visitorName" align="center" label="朝向"></el-table-column>
          <el-table-column prop="visitorName" align="center" label="人脸录入" width="80"></el-table-column>
          <el-table-column prop="loginStatus" width="80" align="center" label="ic卡"></el-table-column>
          <el-table-column prop="status" width="80" align="center" label="业主">
            <template slot-scope="scope">
              {{scope.row.status | getVisitStatus }}
            </template>
          </el-table-column>
          <el-table-column   align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.status == 0"  @click="goInfo(scope.row.id)">添加业主</el-button>
              <el-button type="text" @click="goEdit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="info(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchData.size"
            :total="total"
            layout=" sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <roomInfo ref="roomInfo" />
  </div>
</template>

<script>
import httpRequest from "../../api/api";
import {myMixins} from "../../mixins/mixin";
import roomInfo from "@/views/Community/roomModel/roomInfo";
export default {
  name: "roomList",
  mixins: [myMixins],
  data() {
    return {
      //搜索数据
      searchData: {
        communityId: '',
        visitorName: '',
        visitorPhone: '',
        visitorCarNo: '',
        status:'',
        currentPage: 1,
        size: 10
      },
      communityArr:[],
      statusArr:[
        {label:'全部',value:''},
        {label:'待审核',value:'0'},
        {label:'待进入',value:'1'},
        {label:'已失效',value:'2'},
        {label:'已进入',value:'3'},
        {label:'已离开',value:'4'},
        {label:'驳回',value:'5'}
      ],
      total: 0,
      selectUrl:'/property-manage/community/info/list',
      listUrl: '/property-manage/community/visitor/info/page',
      tableData: []
    }
  },
  components:{
    roomInfo
  },
  mounted() {
    this.remoteMethod('')
  },

  methods: {
    remoteMethod(query) {
      httpRequest(this.selectUrl,"GET",{communityName:query}).then(res=>{
        this.communityArr = res.data;
      })

    },
    info(){
      this.$refs.roomInfo.getInfo()
    },
    go(){
      this.$router.push('/visit/invited')
    },
    goInfo(id){
      this.$router.push(`/visit/invited?id=${id}`)
    },
  },


}
</script>

<style>

</style>
