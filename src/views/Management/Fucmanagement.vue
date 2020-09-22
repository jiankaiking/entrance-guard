<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="searchFrom" :model="searchData" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="searchData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="searchData.roleStatus" placeholder="请选择">
            <el-option label="停止" :value="0" />
            <el-option label="启动" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchClick">搜索</el-button>
          <el-button type="success" plain @click="headAdd">新增</el-button>
          <el-button plain @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" empty-text border style="width: 99.8%">
          <el-table-column align="center" prop="roleId" label="序号" />
          <el-table-column prop="roleName" label="角色名称" align="center" />
          <el-table-column prop="personCount" align="center" label="人数" />
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-button type="text" size="small">{{ scope.row.roleStatusName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="roleRemarks" align="center" label="角色描述" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="headEdit(scope.row)">编辑</el-button>
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
    <el-dialog width="50%" title="角色信息" align="center" :visible.sync="dialogTableVisible">
      <FucmanagementModel ref="modalForm" @close="modalClose" @ok="modalFormOk" />
    </el-dialog>
  </div>
</template>

<script>
import { myMixins } from '../../mixins/mixin'
import FucmanagementModel from './FucmanagementModel'

export default {
  name: 'Funcmanagement',
  components: {
    FucmanagementModel
  },
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        roleName: '', // 角色名称
        roleStatus: '', // 角色状态
        page: 1,
        size: 10
      },
      listUrl: '/managecenter/roleManage/getRoleList',
      total: 0,
      dialogTableVisible: false,
      tableData: []
    }
  },
  methods: {}

}
</script>

<style>
    .transfer{
        height: 300px !important;
    }
    .transfer .transfer-title,.transfer .filter-tree{
        display: none !important;
    }
    .transfer .transfer-main{
        height: 100% !important;
    }
</style>
<style scoped>

    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
    }

    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;
    }

    .tableData .pagination {
        padding-bottom: 30px;
    }
</style>

