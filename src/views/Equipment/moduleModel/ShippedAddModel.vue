<template>
    <el-form label-width="90px" :model="modelFromdata">
        <div class="title">设备信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="设备型号" >
                    <EquimentSelect  :deviceTypeId.sync="modelFromdata.deviceTypeId"></EquimentSelect>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="单价(元)">
                    <el-input placeholder="请输入设备单价" v-model="modelFromdata.price"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="数量(台)" >
                    <el-input placeholder="请设备设备数量" v-model="modelFromdata.applyCount"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="总价(元)" >
                    <el-input placeholder="14990" disabled v-model="totalPrices" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">收货信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="收货人" >
                    <el-input placeholder="请输入收货人姓名" v-model="modelFromdata.consignee"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="联系方式">
                    <el-input placeholder="请输入收货电话号码" v-model="modelFromdata.consigneePhone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" v-if="modelFromdata.deviceApplyId">
                <el-form-item label="收货号码" >
                    <el-input placeholder="请输入收货电话号码" v-model="modelFromdata.consigneeArea"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11"  :offset="1" v-if="!modelFromdata.deviceApplyId">
                <el-form-item label="收货地址" >
                    <CitySelect @selectCode="selectCode"></CitySelect>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="modelFromdata.deviceApplyId?1:0">
                <el-form-item label="详细地址" >
                    <el-input placeholder="请输入详细地址" v-model="modelFromdata.consigneeAdds"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">付款信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="支付方式" >
                    <el-select v-model="modelFromdata.payChannel">
                        <el-option v-for="item in payList" :key="item.dataValue" :label="item.dataCode" :value="item.dataValue"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="实付金额">
                    <el-input placeholder="请输入实付金额(元)" v-model="modelFromdata.payMoney"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="付款时间" >
                    <el-date-picker
                            type="date"
                            v-model="modelFromdata.payTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="收款账户" >
                    <el-input placeholder="请输入收款账户" v-model="modelFromdata.payAccount" ></el-input>
                </el-form-item>
            </el-col>
            
            <el-col :span="5">
                <el-form-item label="代理商名称" >
                    <el-select v-model="modelFromdata.agentId" placeholder="请选择代理商">
                                <el-option
                                        v-for="item in selectFactoryList"
                                        :key="item"
                                        :value="item">
                                {{item}}
                                </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="预存款可用余额">
                    <el-input v-model="modelFromdata.prepareSavings" placeholder="请输入收货电话号码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="支付类型" >
                    <el-select v-model="modelFromdata.payType">
                       <el-option
                                        v-for="item in payList"
                                        :key="item.dataValue"
                                        :label="item.dataCode"
                                        :value="item.dataValue">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="备注信息" >
                    <el-input placeholder="请输入备注信息" v-model="modelFromdata.payRemark" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="赠送原因" >
                    <el-input placeholder="请输入赠送原因" v-model="modelFromdata.payAccount" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">订单信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="申请时间">
                    <el-date-picker
                            type="date"
                            v-model="modelFromdata.createTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">附件信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="上传附件" class="file-upload">
                    <el-upload 
                         v-show="Fileupload"
                        action="/api/sellerManagement/managecenter/upload/uploadFile"
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
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">物流信息</div>
        <el-row >
            <el-col :span="5">
                <el-form-item label="发货数量">
                    <el-input placeholder="请输入发货数量"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="发货时间">
                    <el-input placeholder="请输入发货时间"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="发货人" >
                    <el-input placeholder="请输入备注信息" v-model="modelFromdata.payRemark" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="发货厂商" >
                    <el-input placeholder="请输入发货厂商" v-model="modelFromdata.agentName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="设备SN码" >
                    <el-input placeholder="请输入设备SN码" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="快递单号">
                    <el-input placeholder="请输入快递单号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="快递公司" >
                    <el-date-picker
                            type="date"
                            placeholder="选择快递公司">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="快递单图" >
                    <img src="" alt="" width="150" height="150">
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" :offset="9">
                <el-button @click="backrank">返回</el-button>
                <el-button style="margin-left: 80px" @click="submitApply">提交审核</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    import httpRequest from "../../../api/api";
    import EquimentSelect from "../../../components/select/EquimentSelect";
    import CitySelect from "../../../components/select/CitySelect";
    var token = localStorage.getItem("token")
    export default {
        name: "ShippedAddModel",
        props:{
                payList:{
                    type:Array
                },
                selectFactoryList:{
                    type:Array
                }
        },
        data(){
            return{
                modelFromdata:{
                    myHeaders: {Authorization: token},
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
                fileList:[],
                Fileupload:true,
            }
        },
        methods:{
             ///删除上传附件
            filehandleClose(tag) {
                this.fileList=[];
                this.Fileupload=true
                // this.agentManage.contractUrl=''
            },
            // 上传附件
            handleAvatarSuccess1(e) {
                if(e.success){
                    this.Fileupload=false
                    // this.agentManage.contractUrl=e.data
                    this.fileList.push({
                    'name':'附件信息',
                    'url':e.data
                    })
                }
            },
            //提交审核
            submitApply(){
                httpRequest(this.url.add,"POST",this.modelFromdata)
                    .then(res=>{
                        console.log(res)
                    })
            },
            //清空填充项
            modelDatanull() {
                for (var key in this.modelFromdata) {
                    this.modelFromdata[key] = ""
                }
            },
            add() {
                this.modelDatanull()
            },

            edit(id){
                httpRequest(this.url.info,"GET",{deviceApplyId:id})
                    .then(res=>{
                        this.modelFromdata = res.data;
                    })
            },

            //省市区
            selectCode(e){
                this.modelFromdata.consigneeArea = e;
            },
            backrank(){
                this.$emit('backrank')
            },
        },
        computed:{
            //计算总价
            totalPrices(){
                return this.modelFromdata.price* this.modelFromdata.applyCount
            }
        },
        components:{
            EquimentSelect,
            CitySelect
        },


    }
</script>
<style >
    .file-upload .el-upload{
        border: none;
        width: auto;
        height: auto;
        line-height: auto;
    }
</style>
<style scoped>
    
    .tags a{
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
