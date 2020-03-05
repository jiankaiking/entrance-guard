<template>
    <el-form label-width="100px" :model="modelFromdata">
        <el-row>
            <el-col :span="10">
                <el-form-item label="代理商名称">
                    <el-input placeholder="请选择" v-model="modelFromdata.agentId" />
                </el-form-item>
                <el-form-item label="赠送数量">
                    <el-input placeholder="请输入设备数量"  v-model="modelFromdata.deliveryCount"  />
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="快递单图">
                    <uploadImg :imgUrl.sync="modelFromdata.expressOrderImg"></uploadImg>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="赠送原因">
                    <el-input placeholder="请输入内容"  v-model="modelFromdata.presentDescription"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="设备SN码">
                    <el-input placeholder="请输入设备SN码"  v-model="modelFromdata.snCode"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="发货厂商">
                    <el-input placeholder="请输入内容"  v-model="modelFromdata.sendOutFactoryType"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="收货人">
                    <el-input placeholder="请输入收货人姓名"  v-model="modelFromdata.consignee"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="厂商名称">
                    <el-input placeholder="请输入快递单号"  v-model="modelFromdata.sendOutFactoryName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="联系方式">
                    <el-input placeholder="请输入设备SN码" v-model="modelFromdata.consigneePhone"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="快递单号">
                    <el-input placeholder="请输入快递单号"  v-model="modelFromdata.expressOrderNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="收货地址">
                    <el-input placeholder="请输入设备SN码" v-model="modelFromdata.consigneeArea"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="快递公司">
                    <el-input placeholder="请输入快递公司"  v-model="modelFromdata.expressCompany"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="详细地址">
                    <el-input placeholder="请输入详细地址"  v-model="modelFromdata.consigneeAdds"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label-width="0">
            <el-button>取消</el-button>
            <el-button @click="saveBtn">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import httpRequest from "../../../api/api";
    import uploadImg from "../../../components/uploadImg/uploadImg";

    export default {
        name: "PresentModel",
        props:["deviceTypeId"],
        data(){
            return{
                modelFromdata:{
                    deviceTypeId:this.deviceTypeId, //设备类型id
                    agentId:'',//代理商ID
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
                },
            }
        },
        components:{
            uploadImg
        },
        methods:{
            //赠送
            saveBtn(){
                httpRequest("/deviceManage/deviceOutbound/saveDeviceGive","POST",this.modelFromdata)
                    .then(res=>{
                        console.log(res)
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
