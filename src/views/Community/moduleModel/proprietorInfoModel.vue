<template>
    <el-dialog title="业主信息" center width="30%" :visible.sync="dialogTableVisible">
                    <div class="title">业主信息</div>
        <div class="info-box">
            <p>姓名：{{infoObj.ownerName}}</p>
            <p>类型：{{infoObj.ownerType}}</p>
            <p>联系方式：{{infoObj.ownerPhone}}</p>
            <p>创建时间：{{infoObj.createTime | getTime}}</p>
            <p>证件类型：{{infoObj.ownerIdType}}</p>
            <p>证件号码：{{infoObj.ownerIdNo}}</p>
            <p>小区地址：{{infoObj.communityName + infoObj.buildingName + infoObj.unitName + infoObj.ownerRoomNo }}</p>
        </div>
        <div class="title">人脸信息</div>
        <div class="info-box">
            <el-image :src="infoObj.imgUrl" :preview-src-list="[infoObj.imgUrl]"></el-image>
        </div>
    </el-dialog>

</template>

<script>
    export default {
        data() {
            return {
                infoObj:{},
                dialogTableVisible:false,
            }
        },

        methods: {
            sendInfo(row){
                this.dialogTableVisible = true;
                this.infoObj = row;

            },
            close(){
                this.dialogTableVisible = false;
            },
        },
    }

</script>
<style scoped>
 .info-box{
     padding: 0 50px; box-sizing: border-box; color: #333333; font-size: 16px; line-height: 28px; margin-bottom: 20px;
 }
    .info-box .el-image{
        width: 150px; height: 95px;
    }
</style>



