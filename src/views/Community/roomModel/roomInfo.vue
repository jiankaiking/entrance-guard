<template>
  <el-dialog :lock-scroll="false" center :visible.sync="dialogTableVisible">
    <div class="title">房间信息</div>
    <div class="info-msg">
      <span>小区:{{ infoObj.communityName }}</span><span>楼号：{{ infoObj.buildingName }}</span>
      <span>单元：{{ infoObj.unitName }}</span><span>房间号：{{ infoObj.roomNo }}</span>
      <span>物业类型：{{ infoObj.buildingType }}</span><span>户型：{{ infoObj.roomType }}</span>
      <span>建筑面积（平方）：{{ infoObj.roomArea }}</span><span>朝向：{{ infoObj.roomToward }}</span>
      <span>住户人数：{{ infoObj.ownerCount }}</span><span>人脸录入：{{ infoObj.faceCount }}</span>
      <span>ic卡张数：{{ infoObj.icCount }}</span>
    </div>
    <div class="tab-card">
      <span :class="{acitive:type === 0}" @click="changeInfo(0)">住户信息</span>
      <span :class="{acitive:type !== 0}" @click="changeInfo(1)">ic卡信息</span>
    </div>
    <component :is="componentArr[type]" :id="infoObj.id" />
  </el-dialog>
</template>

<script>
// import httpRequest from '../../../api/api'
import roomIcCardInfoTab from '@/views/Community/roomModel/roomIcCardInfoTab'
import roomUserInfoTab from '@/views/Community/roomModel/roomUserInfoTab'
export default {
  name: 'RoomInfo',
  components: {
    roomIcCardInfoTab,
    roomUserInfoTab
  },
  data() {
    return {
      dialogTableVisible: false,
      infoObj: {
      },
      type: 0,
      componentArr: ['roomUserInfoTab', 'roomIcCardInfoTab'],
      url: {
        add: '/property-manage/community/info/insert',
        edit: '/property-manage/community/info/update'
      }
    }
  },
  mounted() {
    this.$route.query.id && console.log(123)
  },
  methods: {
    changeInfo(type) {
      this.type = type
    },
    getInfo(row) {
      this.dialogTableVisible = true
      this.changeInfo(this.type === 0 ? 1 : 0)
      Object.assign(this.infoObj, row)
    }
  }
}
</script>
<style scoped>
.info-msg,.tab-card {
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
}
.tab-card{
  width: 200px;
  height: 60px;line-height: 60px;text-align: center; border: 1px solid #38B8EE; margin: 20px 0;
}
.tab-card span{
   display: flex; width: 50%;  line-height: 60px; justify-content: center; cursor: pointer;
}
.tab-card span.acitive{
  color: #38B8EE;
}
.info-msg span {
  width: 25%;
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
}

</style>
