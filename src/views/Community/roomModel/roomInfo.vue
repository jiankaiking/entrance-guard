<template>
  <el-dialog :lock-scroll="false" center :visible.sync="dialogTableVisible">
    <div class="title">房间信息</div>
    <div class="info-msg">
      <span>小区:123</span><span>楼号：1栋</span>
      <span>单元：1单元</span><span>房间号：101</span>
      <span>物业类型：住宅</span><span>户型：2室1厅</span>
      <span>建筑面积（平方）：70</span><span>朝向：朝南</span>
      <span>住户人数：2</span><span>人脸录入：1</span><span>ic卡张数：1</span>
    </div>
    <div class="tab-card">
      <span :class="{acitive:type == 1}" @click="changeInfo(1)">住户信息</span>
      <span :class="{acitive:type != 1}" @click="changeInfo(2)">ic卡信息</span>
    </div>
  </el-dialog>
</template>

<script>
import httpRequest from "../../../api/api";

export default {
  name: 'roomInfo',
  data() {
    return {
      dialogTableVisible: true,
      infoObj: {
        a: '1',
        b: '1',
        c: '1',
        d: '1',
      },
      type:1,
      url: {
        add: '/property-manage/community/info/insert',
        edit: '/property-manage/community/info/update',
      },
    }
  },
  mounted() {
    this.$route.query.id && console.log(123)
  },
  methods: {
    changeInfo(type){
      this.type =type
    },
    getInfo() {
      this.dialogTableVisible = true;
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
  height: 60px;line-height: 60px;text-align: center; border: 1px solid red; margin: 20px 0;
}
.tab-card span{
   display: flex; width: 50%;  line-height: 60px; justify-content: center; cursor: pointer;
}
.tab-card span.acitive{
  color: red;
}
.info-msg span {
  width: 25%;
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
}

</style>
