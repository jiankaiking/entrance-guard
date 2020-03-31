<template>
    <el-form label-width="90px" :model="modelFromdata">
        <div class="title">设备信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="设备型号" >
                    <el-select v-model="modelFromdata.deviceTypeId" >
                         <el-option v-for="item in selectDeviceTypeList" 
                         :key="item.deviceTypeId" 
                         :label="item.deviceTypeCode" 
                         :value="item.deviceTypeId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="单价(元)">
                    <el-input  v-model="modelFromdata.price"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="数量(台)" >
                    <el-input  v-model="modelFromdata.applyCount"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="总价(元)" >
                    <el-input  v-model="modelFromdata.sumMoney" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">收货信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="收货人" >
                    <el-input  v-model="modelFromdata.consignee"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="联系方式">
                    <el-input  v-model="modelFromdata.consigneePhone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11"  :offset="1" v-if="city">
                <el-form-item label="收货地址" >
                     <CitySelect  @selectCode="selectCode"></CitySelect>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="详细地址" >
                    <el-input  @focus="cityStatus" v-model="modelFromdata.consigneeAdds"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">付款信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="支付方式" >
                     <el-select v-model="modelFromdata.payChannel" >
                         <el-option v-for="item in device_pay_channel" 
                         :key="item.dataValue" 
                         :label="item.dataCode" 
                         :value="item.dataValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="实付金额" v-if="modelFromdata.payChannel!='赠送'">
                    <el-input  v-model="modelFromdata.payMoney"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="付款时间" v-if="modelFromdata.payChannel!='赠送'">
                    <el-date-picker
                    v-model="modelFromdata.payTime"
                    type="date"
                    format='yyyy-MM-dd'
                    value-format='yyyy-MM-dd'
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" v-if="modelFromdata.payChannel!='赠送'">
                <el-form-item label="支付账户" >
                    <el-input  v-model="modelFromdata.payAccount" ></el-input>
                </el-form-item>
            </el-col>
            
            <el-col :span="5">
                <el-form-item label="代理商名称" >
                    <el-select v-model="modelFromdata.agentId" >
                         <el-option v-for="item in selectAgentList" 
                         :key="item.agentId" 
                         :label="item.agentName"
                         :value="item.agentId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" v-if="modelFromdata.payChannel=='预存款'">
                <el-form-item label="预存款可用余额">
                    <el-input v-model="modelFromdata.prepareSavings" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" v-if="modelFromdata.payChannel!='赠送'"> 
                <el-form-item label="支付类型">
                    <el-select v-model="modelFromdata.payType" >
                         <el-option v-for="item in device_pay_type" 
                         :key="item.dataValue" 
                         :label="item.dataCode" 
                         :value="item.dataValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" v-if="modelFromdata.payChannel!='赠送'">
                <el-form-item label="备注信息" >
                    <el-input  v-model="modelFromdata.payRemark" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" v-if="modelFromdata.payChannel=='赠送'">
                <el-form-item label="赠送原因" >
                    <el-input placeholder="请输入赠送原因" v-model="modelFromdata.presentDescription" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title" v-if="modelFromdata.payType==2">完善信息</div>
        <el-row v-if="modelFromdata.payType==2">
            <el-col :span="5">
                <el-form-item label="支付方式" >
                    <el-input  v-model="modelFromdata.finishPayChannel" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="实付金额">
                    <el-input  v-model="modelFromdata.finishMoney"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="付款时间" >
                    <el-input  v-model="modelFromdata.finishTime"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="付款账户" >
                    <el-input  v-model="modelFromdata.finishAccount" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="代理商名称" >
                    <el-input  v-model="modelFromdata.agentName" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="备注信息" >
                    <el-input  v-model="modelFromdata.finishRemark" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">订单信息</div>
        <el-row>
            <el-col :span="5" v-if="addShip">
                <el-form-item label="订单号">
                    <el-input  v-model="modelFromdata.applyOrderNum" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1"  v-if="addShip">
                <el-form-item label="订单状态">
                    <el-input  v-model="modelFromdata.applyStatus"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="申请时间">
                    <el-date-picker
                    v-model="modelFromdata.createTime"
                    type="date"
                    format='yyyy-MM-dd'
                    value-format='yyyy-MM-dd'
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
             <el-col :span="5" :offset="1">
                <el-form-item label="出库单号" v-if="modelFromdata.applyStatus=='已发货'">
                    <el-input  v-model="modelFromdata.deviceOutboundId"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">附件信息 <span v-if="modelFromdata.rejectedRemark" style="color:#FD6969;font-size:16px">(驳回原因：{{modelFromdata.rejectedRemark}})</span></div>
        <el-row>
            <el-col :span="5" class="file-upload">
                <el-upload 
                         v-show="Fileupload"
                        action="/api/managecenter/upload/uploadFile"
                        list-type="picture-card"
                        :limit="1"
                        :show-file-list='false'
                        :headers="myHeaders"
                        :file-list="fileList"
                        :on-success="handleAvatarSuccess1">
                        <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                </el-upload>
                <el-tag
                        class="tags"
                        :key="tag.name"
                        v-for="tag in fileList"
                        closable
                        :disable-transitions="false"
                        @close="filehandleClose(tag)">
                        <a :href="tag.url">{{tag.name}}</a>
                </el-tag>
                <div v-if="addShip&&modelFromdata.payReceipts" style="padding:20px">支付回执单 <a :href="modelFromdata.payReceipts">下载</a> </div>
                <div v-if="modelFromdata.payType==2&&modelFromdata.finishReceipts" style="padding:20px">支付回执单 <a :href="modelFromdata.finishReceipts">下载</a> </div>
            </el-col>
        </el-row>
        <div class="title" v-if="modelFromdata.isOnline!=0">物流信息</div>
        <div v-if="modelFromdata.applyStatus=='已发货'">
            <el-row  v-for="(item,index) in modelFromdata.deviceOutboundList" :key="index">
                <el-col :span="5">
                    <el-form-item label="发货数量">
                        <el-input disabled v-model="item.deliveryCount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5"  >
                    <el-form-item label="发货时间">
                        <el-input disabled v-model="item.sendTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="发货人" >
                        <el-input disabled v-model="item.consignor" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="发货厂商" >
                        <el-input disabled v-model="item.sendOutFactoryName" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="设备SN码" >
                        <el-input disabled v-model="item.snCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="快递单号">
                        <el-input disabled v-model="item.expressOrderNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="快递公司" >
                        <el-input disabled v-model="item.expressCompany"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="快递单图" >
                        <img :src="item.expressOrderImg" alt="" width="150" height="150">
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <el-row v-if="modelFromdata.applyStatus!='待审核'">
            <el-col :span="5" :offset="9">
                <el-button @click="backrank">返回</el-button>
                <el-button v-if="modelFromdata.isOnline==0" style="margin-left: 80px" @click="submitApply">提交审核</el-button>
            </el-col>
        </el-row>
        <el-row v-if="modelFromdata.applyStatus=='待审核'">
            <el-col :span="6" :offset="9">
                <el-button  @click="backrank">返回</el-button>
                <el-button style="margin-left: 80px" @click="checkBtn(0)">不通过</el-button>
                <el-button style="margin-left: 80px" @click="checkBtn(1)">通过</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import httpRequest from "../../../api/api";
    import CitySelect from "../../../components/select/CitySelect";
    var token = localStorage.getItem("token")
    export default {
        name: "ShippedAddModel",
        data(){
            return{
                modelFromdata:{
                    isOnline:1, ///线下
                    deviceTypeId:0,//设备类型
                    price:'',//单价
                    applyCount:1,//申请数量
                    consignee:'',//收货人
                    consigneePhone:'',//收货人手机号
                    consigneeArea:'',//收货人区域
                    consigneeAdds:'',//收货人地址
                    payMoney:'',//支付金额
                    payAccount:'',//支付账号
                    payType:'',//支付类型 1全额2定金
                    payReceipts:'',//支付回执
                    applyTime:'',//申请时间
                    payTime:'',//支付时间
                    payChannel:'',//支付方式(1支付宝2预存款3银行卡)
                    payRemark:'',//支付备注
                },
                url:{
                    add:"/managecenter/deviceManage/deviceApply/saveDeviceDelivery",
                    info:"/managecenter/deviceManage/deviceApply/queryDeviceApplyInfo"
                },
                city:false,
                check:false,//审核
                addShip:true,
                selectDeviceTypeList:[],///设备类型
                device_pay_channel:[], ///支付方式
                device_pay_type:[],
                selectAgentList:[],
                fileList:[],
                Fileupload:false,
                myHeaders: {Authorization: token},
            }
        },
        mounted(){
            httpRequest("managecenter/deviceManage/deviceType/selectDeviceTypeList", "GET")
                    .then(res => {
                        this.selectDeviceTypeList = res.data;
            })
            httpRequest("managecenter/sysDict/getSysDict", "GET")
                    .then(res => {
                        this.device_pay_channel = res.data.device_pay_channel;
                        this.device_pay_type = res.data.device_pay_type;
            })
            httpRequest("managecenter/deviceManage/device/selectAgentList", "GET")
                    .then(res => {
                        this.selectAgentList = res.data;
            })
        },
        methods:{
            
            checkBtn(status){
                var data={
                    deviceApplyId:this.modelFromdata.deviceApplyId,
                    auditStatus:this.modelFromdata.applyStatus,
                    type:status,
                    payMoney:this.modelFromdata.applyStatus, ///
                    payTime:this.modelFromdata.payTime,
                    payRemark:this.modelFromdata.payRemark
                }
                this.$emit('trueDelivery',1,data)
            },
              ///上传附件
            filehandleClose(tag) {
                this.fileList=[];
                this.Fileupload=true
                this.modelFromdata.payReceipts=''
            },
            // 上传附件
            handleAvatarSuccess1(e) {
                if(e.success){
                    this.Fileupload=false
                    this.modelFromdata.payReceipts=e.data
                    this.fileList.push({
                    'name':'支付回执单',
                    'url':e.data
                    })
                }
            },
            //提交审核
            submitApply(){
                if(this.modelFromdata.payType==2){
                    this.url.add='/managecenter/deviceManage/deviceApply/saveFinishApply'
                }
                httpRequest(this.url.add,"POST",this.modelFromdata)
                    .then(res=>{
                        if(res.success){
                            this.$message({
                                    type: 'success',
                                    message: res.msg
                                })
                        this.$emit('backrank')
                        }
                    })
            },
            add() {
                this.modelDatanull()
            },

            edit(id){
                httpRequest(this.url.info,"GET",{deviceApplyId:id})
                    .then(res=>{
                        this.modelFromdata = res.data;
                    })
            this.check=true
            },
            //省市区
            selectCode(e){
                this.modelFromdata.consigneeArea = e;
            },
            backrank(){
                this.$emit('backrank')
            },
            cityStatus(){
                this.city=true
            },
            //清空填充项
            modelDatanull() {
                for (var key in this.modelFromdata) {
                    this.modelFromdata[key] = ""
                }
                this.modelFromdata.isOnline=0
                this.Fileupload=true
                this.addShip=false
            },

        },
        components:{
            CitySelect
        },
        computed:{
            //计算总价
            totalPrices(){
                return this.modelFromdata.price* this.modelFromdata.applyCount
            }
        },
    }
</script>
<style >
    .file-upload .el-upload{
        border: none;
        width: auto;
        height: auto;
        line-height: 1;
    }
</style>
<style scoped>
     a{
        text-decoration:none;
        color: #409EFF;
     }
    .spacing{
        margin: 20px 0;
    }
    .el-tag{
        margin-left: 20px;
    }
     .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }
     .title:before {
        position: absolute;
        content: "";
        left: 0;
        top: 2px;
        width: 9px;
        height: 21px;
        background: linear-gradient(180deg, #ff2a00 0%, #ed7346 100%);
        border-radius: 5px;
    }
     .el-date-editor.el-input, .el-date-editor.el-input__inner{
         width: 100%;
     }
</style>
