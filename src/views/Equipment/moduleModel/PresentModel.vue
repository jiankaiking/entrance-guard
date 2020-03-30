<template>
    <el-form label-width="100px" :model="modelFromdata">
        <el-row>
            <el-col :span="12">
                    <el-form-item label="代理商名称"  v-if="type!=1">
                         <el-select v-model="modelFromdata.agentId" >
                         <el-option v-for="item in selectAgentList" 
                         :key="item.agentId" 
                         :label="item.agentName"
                         :value="item.agentId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备数量"> 
                    <el-input placeholder="请输入设备数量"  v-model="modelFromdata.deliveryCount"  />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="快递单图">
                    <uploadImg :imgUrl.sync="modelFromdata.expressOrderImg"></uploadImg>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12" v-if="type!=1">
                <el-form-item label="赠送原因">
                    <el-input placeholder="请输入内容"  v-model="modelFromdata.presentDescription"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="设备SN码">
                    <el-input placeholder="请输入设备SN码"  v-model="modelFromdata.snCode"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="发货厂商">
                    <el-select v-model="modelFromdata.sendOutFactoryType" @change="sendOutFactoryChange">
                         <el-option v-for="item in device_delivery_factory_list" 
                         :key="item.dataValue" 
                         :label="item.dataCode"
                         :value="item.dataValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="收货人" v-if="type!=1">
                    <el-input placeholder="请输入收货人姓名"  v-model="modelFromdata.consignee"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="收货人" v-if="type==1">
                    <el-input placeholder="请输入收货人姓名"  v-model="modelFromdata.consignor"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="厂商名称">
                    <el-input placeholder="请输入快递单号"  v-model="modelFromdata.sendOutFactoryName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系方式">
                    <el-input placeholder="请输入设备SN码" v-model="modelFromdata.consigneePhone"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="快递单号">
                    <el-input placeholder="请输入快递单号"  v-model="modelFromdata.expressOrderNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="收货地址" v-if="type!=1">
                    <el-input placeholder="请输入收货地址" v-model="modelFromdata.consigneeArea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="快递公司" >
                    <el-input placeholder="请输入快递公司"  v-model="modelFromdata.expressCompany"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item label="详细地址" v-if="type!=1">
                    <el-input placeholder="请输入详细地址"  v-model="modelFromdata.consigneeAdds"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item label="发货时间" v-if="type==1">
                     <el-date-picker
                    v-model="modelFromdata.deliveryTime"
                    type="date"
                    format='yyyy-MM-dd'
                    value-format='yyyy-MM-dd'
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label-width="0">
            <el-button @click="close">取消</el-button>
            <el-button @click="saveBtn">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import httpRequest from "../../../api/api";
    import uploadImg from "../../../components/uploadImg/uploadImg";

    export default {
        name: "PresentModel",
        props:{
            deviceTypeId:{
                type:Number,
            },
            type:{
                type:Number,
            }
        },
        data(){
            return{
                sendOutFactoryStatus:false,
                modelFromdata:{
                    deviceTypeId:this.deviceTypeId, //设备类型id
                    agentId:null,//代理商ID
                    deliveryCount:'',//赠送数量
                    presentDescription:'',//赠送原因
                    sendOutFactoryType:'',//发货厂商
                    sendOutFactoryName:'',//发货厂商名称
                    expressOrderNum:'',//快递单号
                    expressCompany:'',//快递公司
                    expressOrderImg:'',//快递单图
                    consignee:'',//收货人名字
                    consigneePhone:'',//收货人联系方式
                    consigneeArea:'',//收货人省市区
                    consigneeAdds:'',//收货人详细地址
                    snCode:'', //sn码
                    deliveryTime:''
                },
                selectAgentList:[],
                device_delivery_factory_list:[]
            }
        },
        components:{
            uploadImg
        },
        mounted(){
            httpRequest("managecenter/deviceManage/device/selectAgentList", "GET")
                    .then(res => {
                        this.selectAgentList = res.data;
            })
            httpRequest("managecenter/sysDict/getSysDict", "GET")
                    .then(res => {
                        this.device_delivery_factory_list = res.data.device_delivery_factory_list;
            })
        },
        methods:{
            //取消
            close(){
               this.$emit('close')
            },
            sendOutFactoryChange(){
                if(this.modelFromdata.sendOutFactoryType==1){
                    this.modelFromdata.sendOutFactoryName='近店科技'
                }else{
                    this.modelFromdata.sendOutFactoryName=''
                }
            },
            //赠送
            saveBtn(){
                var url;
                if(this.type==1){
                    url='managecenter/deviceManage/deviceApply/confirmDelivery'
                    delete this.modelFromdata.agentId
                    delete this.modelFromdata.presentDescription
                    delete this.modelFromdata.consignee
                    delete this.modelFromdata.consigneeArea
                    delete this.modelFromdata.consigneeAdds
                    delete this.modelFromdata.deviceTypeId
                    this.modelFromdata.deviceApplyId=this.deviceTypeId
                }else{
                    url='/managecenter/deviceManage/deviceOutbound/saveDeviceGive'
                    delete this.modelFromdata.deliveryTime
                }
                httpRequest(url,"POST",this.modelFromdata)
                    .then(res=>{
                        if(res.success){
                            this.$message({
                                    type: 'success',
                                    message: res.msg
                                })
                            this.$emit('modalClose')
                        }
                    })
            },
        }
    }
</script>

<style scoped>
   .avatar-uploader{
       width: 100px; height: 100px;
   }
    .avatar{
        width: 100px; height: 100px;
    }
   .el-form-item{
       padding-bottom: 0;
   }
    .avatar-uploader-icon{
        width: 100px; height: 100px; line-height: 100px;
    }
</style>
