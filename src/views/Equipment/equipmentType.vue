<template>
  <div class="main-contenner">
    <div class="eqioment-type">
      <el-form label-width="50px">
        <el-form-item>
          <el-dialog title="设备类型" :visible.sync="centerDialogVisible" width="30%" center>
            <el-form ref="form" label-width="120px" :model="modelFromdata" :rules="rules">
              <el-form-item label="设备类型" prop="equipmentTypeName">
                <el-input v-model="modelFromdata.equipmentTypeName" placeholder="请输入类型名称" />
              </el-form-item>
              <el-form-item label="是否按IP地址">
                <el-radio-group v-model="modelFromdata.ipStatus">
                  <el-radio label="0">有IP</el-radio>
                  <el-radio label="1">无IP</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addType('form')">确 定</el-button>
            </span>
          </el-dialog>
          <el-button type="success" plain @click="add">新增设备类型</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableData">
      <div class="tableBox">
        <el-table v-loading="loading" :data="tableData" border empty-text style="width: 100%">
          <el-table-column type="index" width="300" align="center" label="序号" />
          <el-table-column prop="equipmentTypeName" label="设备名称" align="center" />
          <el-table-column prop="loginInfo" align="center" label="操作信息">
            <template slot-scope="scope">
              <el-button type="text" @click="headEdit(scope.row)">编辑</el-button>
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
  </div>
</template>

<script>
import httpRequest from '../../api/api'
import { myMixins } from '../../mixins/mixin'

export default {
  name: 'EquimentType',
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        currentPage: 1,
        size: 10
      },
      modelFromdata: {
        equipmentTypeName: '',
        ipStatus: '0'
      },
      rules: {
        equipmentTypeName: [{ required: true, message: '输入设备类型', trigger: 'blur' }]
      },
      centerDialogVisible: false,
      total: 0,
      listUrl: '/property-manage/equipment/type/page',
      url: {
        add: '/property-manage/equipment/type/insert',
        del: '/property-manage/equipment/type/delete',
        edit: '/property-manage/equipment/type/update'
      },
      tableData: []
    }
  },

  mounted() {

  },
  methods: {
    add() {
      Object.keys(this.modelFromdata).map(key => {
        this.modelFromdata[key] = ''
      })
      this.modelFromdata.ipStatus = '0'
      this.centerDialogVisible = true
    },
    headEdit(row) {
      this.centerDialogVisible = true
      this.modelFromdata = Object.assign(this.modelFromdata, row)
    },
    addType(fromName) {
      this.$refs[fromName].validate((valid) => {
        if (valid) {
          const url = this.modelFromdata.id ? this.url.edit : this.url.add
          httpRequest(url, 'POST', this.modelFromdata)
            .then(res => {
              if (res.code === 200) {
                this.centerDialogVisible = false
                this.getTableData()
              }
            })
        } else {
          return false
        }
      })
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

.eqioment-type .el-form-item {
  margin-bottom: 20px;
}
</style>
