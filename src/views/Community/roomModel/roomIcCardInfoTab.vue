<template>
  <el-table border :data="tableData">
    <el-table-column prop="icNo" align="center" label="ic卡编号" />
    <el-table-column prop="equipmentNos" align="center" label="设备编号" />
    <el-table-column  align="center" label="操作">
      <template slot-scope="scope">
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { myMixins } from '@/mixins/mixin'

export default {
  name: 'RoomIcCardInfoTab',
  mixins: [myMixins],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      searchData: {
        roomId: this.id,
        currentPage: 1,
        size: 10
      },
      listUrl: `/property-manage/community/room/info/ic/list`,
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
