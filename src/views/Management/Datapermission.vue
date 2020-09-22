<template>
  <div class="data-mission">
    <div class="explain">
      <p>说明</p>
      <p>1.私有:对象中所有数据遵循相关团队成员（包括负责人）及其上级对数据可见，且对这条数据具备同样的权限（只读、可编辑）；上级部门的部门负责人可以看到下级部门的所有数据。</p>
      <p> 2.公开只读:对象中所有数据对全公司公开。单条数据的负责人及其上级、以及相关团队具备编辑权限的成员可以编辑该数据。</p>
      <p> 3.公开读写:对象中所有数据对全公司公开，全员可编辑。</p>
    </div>
    <div class="tablebox">
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%;border-radius: 8px;"
      >
        <el-table-column
          prop="date"
          align="center"
          label="数据类型"
        />
        <el-table-column
          prop="name"
          label="权限"
          align="center"
        >
          <template>
            <el-radio-group>
              <el-radio :label="3">私有</el-radio>
              <el-radio :label="6">公开只读</el-radio>
              <el-radio :label="9">公开读、写</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Datapermission',
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style scoped >
    .data-mission .tablebox {
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        padding: 35px;
        box-sizing: border-box;
        width: 1000px;
        background: #ffffff;
        border-radius: 8px;
    }
    .data-mission .explain {
        margin-bottom: 41px;
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        border-radius: 8px;
        padding: 26px 35px;
        box-sizing: border-box;
    }
    .data-mission .explain p {
        color: #666666;
        font-size: 14px;
        margin-bottom: 12px;
    }
</style>
