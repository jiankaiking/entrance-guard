<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="80px">
        <el-form-item label="小区名称" style="width: 220px">
          <el-input v-model="searchData.communityName" placeholder="请输入小区名称" />
        </el-form-item>
        <el-form-item label="联系人 " style="width: 310px">
          <el-input v-model="searchData.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button type="success" plain @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column prop="communityName" align="center" label="小区名称" />
          <el-table-column prop="buildingCount" label="住宅楼数" align="center" />
          <el-table-column prop="householdCount" align="center" label="住户数" />
          <el-table-column prop="contact" align="center" label="联系人" />
          <el-table-column prop="contactPhone" align="center" label="联系电话" />
          <el-table-column prop="communityAdress" align="center" label="地址" />
          <el-table-column prop="introduce" align="center" label="介绍">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.introduce" placement="top-start">
                <p class="one-line-clamp">{{ scope.row.introduce }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
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
    <community-add ref="modelForm" @ok="modalFormOk" />
  </div>
</template>

<script>
// import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
import communityAdd from './moduleModel/communityAdd'

export default {
  name: 'CommunityList',
  components: {
    communityAdd
  },
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        communityName: '',
        contact: '',
        currentPage: 1,
        size: 10
      },
      dateValue: '',
      total: 0,
      listUrl: '/property-manage/community/info/page',
      tableData: []
    }
  },
  mounted() {

  },
  methods: {
    modelEdit(row) {
      console.log(row)
      this.$refs.modelForm.edit(row)
    },
    add() {
      this.$refs.modelForm.add()
    }
  }

}
</script>

<style>

</style>
