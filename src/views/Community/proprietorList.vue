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
          <el-input v-model="searchData.ownerName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.ownerPhone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item style="width: 220px">
          <el-input v-model="searchData.ownerRoomNo" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button type="success" plain @click="add">新增</el-button>
          <!--                    <el-button type="warning" @click="resetSearch" plain>导入</el-button>-->
        </el-form-item>
        <el-form-item label-width="15px">
          <el-upload
            action="/api/property-manage/community/owner/info/import"
            :show-file-list="false"
            :headers="headers"
            accept=" .xls, .xlsx"
            :before-upload="beforeupload"
            :on-success="onSuccess"
            :on-error="onerror"
            :limit="1"
          >
            <el-button type="warning" plain>导入</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column prop="ownerName" width="140" align="center" label="户主名称" />
          <el-table-column prop="ownerPhone" width="140" label="联系电话" align="center" />
          <el-table-column prop="ownerType" align="center" label="类型" />
          <el-table-column prop="communityName" align="center" label="小区名称" />
          <el-table-column prop="loginStatus" align="center" label="地址">
            <template slot-scope="scope">
              {{ scope.row.buildingName + scope.row.unitName + scope.row.ownerRoomNo }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" align="center" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | getTime }}
            </template>
          </el-table-column>
          <el-table-column prop="faceStatus" align="center" label="人脸采集">
            <template slot-scope="scope">
              {{ scope.row.faceStatus == 1?'已采集':'未采集' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作信息">
            <template slot-scope="scope">
              <el-button type="text">人脸采集</el-button>
              <el-button type="text" @click="headEdit(scope.row)">编辑</el-button>
              <el-popover
                :ref="`popover-${scope.row.id}`"
                width="160"
                style="text-align: right; margin-left: 10px;"
              >
                <p>确认删除？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    type="text"
                    size="mini"
                    @click="scope._self.$refs[`popover-${scope.row.id}`].doClose()"
                  >
                    取消
                  </el-button>
                  <el-button type="success" size="mini" @click="headDelet(scope.row.id)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="text">删除</el-button>
              </el-popover>
              <el-button type="text" @click="headInfo(scope.row)">详情</el-button>
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
    <proprietor-model ref="modelForm" @ok="modalFormOk" />
    <proprietor-info-model ref="infoModel" />
  </div>
</template>

<script>
import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
import proprietorModel from './moduleModel/proprietorModel'
import proprietorInfoModel from './moduleModel/proprietorInfoModel'

export default {
  name: 'ProprietorList',
  components: {
    proprietorModel,
    proprietorInfoModel
  },
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        communityId: '',
        ownerName: '',
        ownerPhone: '',
        ownerRoomNo: '',
        currentPage: 1,
        size: 10
      },
      headers: {
        'Authorization': this.$store.state.token
      },
      communityArr: [],
      total: 0,
      listUrl: '/property-manage/community/owner/info/page',
      url: {
        selectUrl: '/property-manage/community/info/list',
        del: '/property-manage/community/owner/info/delete'
      },
      tableData: []
    }
  },
  mounted() {
    this.remoteMethod('')
  },
  methods: {
    remoteMethod(query) {
      httpRequest(this.url.selectUrl, 'GET', { communityName: query }).then(res => {
        this.communityArr = res.data
      })
    },
    headEdit(row) {
      this.$refs.modelForm.edit(row)
    },
    headInfo(row) {
      console.log(this)
      this.$refs.infoModel.sendInfo(row)
    },
    add() {
      this.$refs.modelForm.add()
    },
    beforeupload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension4 = fileSuffix === 'xls'
      const extension5 = fileSuffix === 'xlsx'
      if (!extension4 && !extension5) {
        this.$message.error('请上传xls、xlsx格式')
      }
      return extension4 || extension5
    },
    onSuccess(file) {
      this.$message.success(file.msg)
      this.getTableData()
    },
    onerror() {
      this.$message.error('导入失败')
    }
  }

}
</script>

<style>

</style>
