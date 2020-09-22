<template>
  <div class="main-contenner">
    <div class="searchData">
      <el-form ref="form" :model="searchData" label-width="80px">
        <el-form-item label="通道名称">
          <el-select v-model="searchData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit">搜索</el-button>
          <el-button type="success" plain @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table
          empty-text
          header-row-style="color:#000000"
          :data="tableData"
          border
          style="width: 100%;"
          @row-click="rowClinck"
        >
          <el-table-column align="center" prop="date" label="序号" />
          <el-table-column align="center" prop="name" label="通道ID" />
          <el-table-column align="center" prop="address" label="通道名称" />
          <el-table-column align="center" prop="address" label="使用说明" />
          <el-table-column align="center" prop="address" label="模版内容" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="info" plain @click="showModel(scope)">编辑</el-button>
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
      <el-dialog
        :lock-scroll="false"
        title="收货地址"
        custom-class="customClass"
        :visible.sync="dialogTableVisible"
        style="text-align: center;"
      >
        <PorttemplateModel />
      </el-dialog>
    </div>

  </div>
</template>

<script>
import PorttemplateModel from './PorttemplateModel'
import { myMixins } from '../../mixins/mixin'

export default {
  name: 'Organization',
  components: {
    PorttemplateModel
  },
  mixins: [myMixins],
  data() {
    return {
      searchData: {

      },
      dialogTableVisible: false,
      tableData: []
    }
  },
  methods: {
    showModel() {
      this.dialogTableVisible = true
    },
    onSubmit() {
      console.log('submit!')
    }
  }

}
</script>

<style scoped lang="scss">

    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);

        .tableBox {
            padding: 30px;
            box-sizing: border-box;

        }

        .pagination {
            padding-bottom: 30px;
        }
    }
</style>
