<template>
  <el-table border :data="tableData">
    <el-table-column prop="ownerName" align="center" label="户主姓名" />
    <el-table-column prop="ownerPhone" align="center" label="联系电话" />
    <el-table-column prop="ownerType" align="center" label="类型" />
    <el-table-column prop="createTime" align="center" label="创建时间" />
    <el-table-column prop="faceStatus" align="center" label="人脸采集" />
    <el-table-column prop="contact" align="center" label="操作">
      <template slot-scope="scope">
        <el-button type="text">人脸采集</el-button>
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
        <el-button type="text">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { myMixins } from '@/mixins/mixin'

export default {
  name: 'RoomUserInfoTab',
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
      listUrl: `/property-manage/community/room/info/owner/list`,
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
