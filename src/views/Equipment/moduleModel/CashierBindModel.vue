<template>
    <el-form class="message-shipped" label-width="75px">
        <el-form-item label="设备号:">
            <el-input v-model="modelFromdata.deviceNo"></el-input>
        </el-form-item>
        <el-form-item label="代理商:">
            <el-select v-model="modelFromdata.agentId" @change="AgentChange" placeholder="请选择代理商家名称">
                         <el-option v-for="(item) in getAgentInfoList" 
                         :key="item.agentId" 
                         :label="item.agentName"
                         :value="item.agentId">
                        </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商家:" v-if="sellerStatus">
            <el-select v-model="modelFromdata.sellerId" @change="sellerChange" placeholder="请选择商家名称">
                         <el-option v-for="item in selectSellerList" 
                         :key="item.sellerId" 
                         :label="item.mercNm"
                         :value="item.sellerId">
                        </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="门店:"  v-if="storeStatus">
            <el-select v-model="modelFromdata.storeId" @change="storeChange" placeholder="请选择门店名称">
                         <el-option v-for="item in selectStoreList" 
                         :key="item.storeId" 
                         :label="item.storeName"
                         :value="item.storeId">
                        </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="收银员:" v-if="personInStatus">
            <el-select v-model="modelFromdata.personInfoId" placeholder="请选择收银员名称">
                         <el-option v-for="item in selectPersionInfoList" 
                         :key="item.personId" 
                         :label="item.personName"
                         :value="item.personId">
                        </el-option>
            </el-select>
        </el-form-item>
        <el-button @click="btnModal">{{modelFromdata.isBind=='已绑定'?'解绑':'绑定'}}</el-button>
    </el-form>
</template>

<script>
import httpRequest from "../../../api/api";
    import CommonSelect from "../../../components/select/CommonSelect";
    export default {
        name: "CashierBindModel",
        data(){
            return{
                modelFromdata:{
                    personInfoId:'',
                    deviceNo:'',
                    storeId:'',
                    sellerId:'',
                    agentId:""
                },
                sellerStatus:false,
                selectSellerList:[],///商家
                storeStatus:false,
                selectStoreList:[],///门店
                personInStatus:false,
                selectPersionInfoList:[],///收银员
                getAgentInfoList:[]///代理商
            }
        },
        components:{
            CommonSelect
        },
        mounted(){
             ///代理商
                httpRequest('sellerManagement/agentManage/getAgentIdAndNameByAgentPid', "get")
                    .then(res => {
                        if(res.success){
                                this.getAgentInfoList=res.data
                        }
                })
                
        },
        methods:{
            //详情
            edit(record) {
                this.modelFromdata=record
                this.AgentChange()
                this.sellerChange()
                this.storeChange()
            },
            ///请求门户
            sellerChange(e){
                ///门户
                httpRequest('managecenter/deviceManage/device/selectStoreList', "get",{sellerId:this.modelFromdata.sellerId})
                    .then(res => {
                        if(res.success){
                                this.selectStoreList=res.data
                                this.storeStatus=true
                               if(e){
                                    this.modelFromdata.storeId=''
                                    this.modelFromdata.personInfoId=''
                                }
                        }
                })
            },
            ///请求收银员的
            storeChange(e){
               ///收银员
                httpRequest('managecenter/deviceManage/device/selectPersionInfoList', "get",{storeId:this.modelFromdata.storeId})
                    .then(res => {
                        if(res.success){
                                this.selectPersionInfoList=res.data
                                this.personInStatus=true
                                if(e){
                                    this.modelFromdata.personInfoId=''
                                }
                        }
                })
            },
            ///请求商家的
            AgentChange(e){
                ///商家
                httpRequest('managecenter/deviceManage/device/selectSellerList', "get",{agentId:this.modelFromdata.agentId})
                    .then(res => {
                        if(res.success){
                                this.selectSellerList=res.data
                                this.sellerStatus=true
                                if(e){
                                    this.modelFromdata.sellerId=''
                                    this.modelFromdata.personInfoId=''
                                    this.modelFromdata.storeId=''
                                }
                        }
                })
            },
            add(){
                this.modelFromdata={
                    personInfoId:'',
                    deviceNo:'',
                    storeId:'',
                    sellerId:'',
                    agentId:""
                }
                this.sellerStatus=false,
                this.selectSellerList=[],///商家
                this.storeStatus=false,
                this.selectStoreList=[],///门店
                this.personInStatus=false,
                this.selectPersionInfoList=[]///收银员
            },
            btnModal(){
                var url;
                if(this.modelFromdata.isBind=='已绑定'){
                    url='managecenter/deviceManage/deviceYrBind/unCashierBind'
                }else{
                    url='managecenter/deviceManage/deviceYrBind/cashierBind'
                }
                httpRequest(url, "post",this.modelFromdata)
                    .then(res => {
                        if(res.success){
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                })
                                this.$emit('ok')
                        }
                })
                
            }
        }
    }
</script>

<style scoped>
    .message-shipped {
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;

    }
</style>
