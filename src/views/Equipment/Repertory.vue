<template>
    <div class="equipment-lsit">
        <div class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="120px">
                    <el-form-item label="设备型号">
                        <EquimentSelect :deviceTypeId.sync="searchData.deviceTypeId"></EquimentSelect>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetValue" type="primary" plain>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="repertory-list">
                <div class="repertory-item" v-for="(item,index) in repertoryData">
                    <div class="item-left">
                        <img class="item-image" :src="item.imgUrl" alt="">
                    </div>
                    <div class="item-right">
                        <div class="item-top">
                            <span class="item-name">{{item.deviceTypeCode}}</span>
                            <span class="item-num">当前库存:{{item.stockDeviceCount}}</span>
                        </div>
                        <div class="total-num">
                            <p>入库总量:{{item.surplusDeviceCount}}</p>
                            <p>出库总量:{{item.sendDeviceCount}}</p>
                        </div>
                        <div class="item-btn">
                            <el-button type="primary" plain size="mini" @click="goGetrecord(item.deviceTypeId)">入库记录</el-button>
                            <el-button type="primary" plain size="mini" @click="goOutrecord(item.deviceTypeId)">出库记录</el-button>
                            <el-button type="primary" plain size="mini"  @click="showPresent(1,item.deviceTypeId)">赠送</el-button>
                            <el-button type="primary" plain size="mini"  @click="showPresent(2,item.deviceTypeId)">补货</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" align="center" :visible.sync="dialogTableVisible"
                :lock-scroll="false" width="40%" :before-close="handleClose">
            <PresentModel :deviceTypeId="deviceTypeId" style="padding: 0 50px; box-sizing: border-box" v-if="cliIndex == 1"  @close="modalClose" @ok="modalFormOk"></PresentModel>
            <EntrepotAddModel v-if="cliIndex == 2" style="padding: 0 150px; box-sizing: border-box"  @close="modalClose" @ok="modalFormOk"></EntrepotAddModel>
        </el-dialog>
    </div>
</template>

<script>

    import httpRequest from "../../api/api";
    import EquimentSelect from "../../components/select/EquimentSelect";
    import EntrepotAddModel from "./moduleModel/EntrepotAddModel";
    import PresentModel from "./moduleModel/PresentModel";

    export default {
        name: "Repertory",

        data() {
            return {
                searchData: {
                    deviceTypeId: ''
                },
                repertoryData: [{}],
                deviceType:[],
                deviceTypeId:'',
                dialogTableVisible:false,
                cliIndex:0,
            }
        },
        mounted(){
            this.getDeviceInStorehouse()
        },
        methods: {
            showPresent(index,deviceTypeId){
                this.cliIndex = index;
                this.deviceTypeId = deviceTypeId;
                this.dialogTableVisible = true
            },
            //入库记录
            goGetrecord(deviceTypeId){
                this.$router.push({path:"/entrepot/getrecord",query:{deviceTypeId:deviceTypeId}})
            },
            //出库记录
            goOutrecord(deviceTypeId){
                this.$router.push({path:"/entrepot/outrecord",query:{deviceTypeId:deviceTypeId}})
            },
            //类型变化
            changeType(){
                this.getDeviceInStorehouse()
            },
            //重置
            resetValue(){
                this.searchData.deviceTypeId = ""
                this.getDeviceInStorehouse()
            },
            //获取库存
            getDeviceInStorehouse(){
                httpRequest("/deviceManage/deviceInStorehouse/sumDeviceCountOrderByDeviceTypeId","GET",this.searchData)
                    .then(res=>{
                        this.repertoryData = res.data;
                    })
            },
        },

        components:{
            EquimentSelect,
            PresentModel,
            EntrepotAddModel
        }
    }
</script>

<style scoped>
    .repertory-item {
        display: flex;
    }

    .total-num {
        color: #999999; line-height: 25px;
        font-size: 14px;
        margin: 20px 0;
    }
    .item-btn .el-button{
        padding: 7px 8px;
    }

    .item-top {
        display: flex;
        justify-content: space-between;
    }

    .item-right {
        width: 100%;
    }

    .item-name {
        color: #000000;
        font-size: 18px;
        font-weight: bold;
    }

    .item-num {
        font-size: 16px;
        color: #FD6969;
    }

    .item-left {
        width: 108px;
        height: 160px;
        margin-right: 20px;
    }

    .item-image {
        display: block;
        width: 108px;
        height: 160px;
    }

    .equipment-lsit {
        padding-bottom: 100px;
        overflow: hidden;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .searchData {
        box-shadow: none;
        margin-bottom: 0;
        padding-top: 25px;
    }

    .tableData {
        box-shadow: none;
    }

    .repertory-list {

        width: calc(100% + 60px);
        padding: 0 113px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }

    .repertory-item {
        margin-top: 35px;
        width: 420px;
        height: 200px;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 4px;
        flex: 0 0 calc(33.33% - 60px);
        margin-right: 60px;
    }


</style>
