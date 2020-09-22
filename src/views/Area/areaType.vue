<template>
  <div class="main-contenner">
    <div class="eqioment-type">
      <el-form label-width="50px">
        <el-form-item>
          <el-button type="success" plain @click="addAreaType">新增区域类型</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column type="index" width="300" align="center" label="序号" />
          <el-table-column prop="areaTypeName" label="区域类型名称" align="center" />
          <el-table-column label="图片" align="center">
            <template slot-scope="scope">
              <el-image style="width:50px; height:50px" :src="scope.row.areaImgUr" :preview-src-list="[scope.row.areaImgUr]" />
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top-start">
                <p class="one-line-clamp">{{ scope.row.remark }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="modelEdit(scope.row)">编辑</el-button>
              <el-popover :ref="`popover-${scope.row.id}`" width="160" style="text-align: right; margin-left: 10px;">
                <p>确认删除？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="scope._self.$refs[`popover-${scope.row.id}`].doClose()">
                    取消
                  </el-button>
                  <el-button type="success" size="mini" @click="headDelet(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="text">删除</el-button>
              </el-popover>
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
    <area-type-model ref="modelForm" @ok="modalFormOk" />
  </div>
</template>

<script>
// import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'
import AreaTypeModel from './moduleModel/AreaTypeModel'

export default {
  name: 'AreaType',
  components: {
    AreaTypeModel
  },
  mixins: [myMixins],
  data() {
    return {
      // 搜索数据
      searchData: {
        currentPage: 1,
        size: 10
      },
      total: 0,
      listUrl: '/property-manage/area/type/page',
      url: {
        del: '/property-manage/area/type/delete'
      },
      tableData: []
    }
  },
  mounted() {

  },
  methods: {
    modelEdit(row) {
      this.$refs.modelForm.edit(row)
    },
    addAreaType() {
      this.$refs.modelForm.add()
    }
  }
}
</script>

<style scoped>
    .eqioment-type {
        background: #ffffff;
        overflow: hidden;
        padding-top: 15px;
        margin-bottom: 20px;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .eqioment-type .el-form-item{
        margin-bottom: 20px;
    }
</style>
