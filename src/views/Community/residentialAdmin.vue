<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="80px">
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
        <el-form-item label="单元" style="width: 220px">
          <el-input v-model="searchData.unitName" placeholder="请输入单元名称" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button type="success" plain @click="add">新增</el-button>
          <!--                    <el-button type="warning" @click="resetSearch" plain>导入</el-button>-->
        </el-form-item>
        <el-form-item label-width="15px">
          <el-upload
            action="/api/property-manage/community/building/info/import"
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
          <el-table-column prop="buildingName" align="center" label="住宅楼名称" />
          <el-table-column prop="unitName" label="单元名称" align="center" />
          <el-table-column prop="floor" align="center" label="楼层" />
          <el-table-column prop="communityName" align="center" label="小区名称" />
          <el-table-column align="center" prop="contact" label="联系人" />
          <el-table-column align="center" prop="contactPhone" label="联系方式" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="modelEdit(scope.row)">编辑</el-button>
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
    <residential-model ref="modelForm" @ok="modalFormOk" />
  </div>
</template>

<script>
import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
import residentialModel from './moduleModel/residentialModel'

export default {
  name: 'ResidentiaAdmin',
  components: {
    residentialModel
  },
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        communityId: '',
        unitName: '',
        currentPage: 1,
        size: 10
      },
      headers: {
        'Authorization': this.$store.state.token
      },
      communityArr: [],
      total: 0,
      selectUrl: '/property-manage/community/info/list',
      listUrl: '/property-manage/community/building/info/page',
      tableData: []
    }
  },
  mounted() {
    this.remoteMethod('')
  },
  methods: {
    modelEdit(row) {
      console.log(row)
      this.$refs.modelForm.edit(row)
    },
    add() {
      this.$refs.modelForm.add()
    },
    remoteMethod(query) {
      httpRequest(this.selectUrl, 'GET', { communityName: query }).then(res => {
        this.communityArr = res.data
      })
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
