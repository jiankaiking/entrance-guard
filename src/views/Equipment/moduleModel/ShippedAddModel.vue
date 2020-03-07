<template>
    <el-form label-width="90px" :model="modelFromdata">
        <div class="title">身份证照片</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="设备型号" >
                    <EquimentSelect :deviceTypeId.sync="modelFromdata.deviceTypeId"></EquimentSelect>
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
                    <el-input placeholder="14990" ></el-input>
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
            <el-col :span="11"  :offset="1">
                <el-form-item label="收货地址" >
                    <CitySelect @selectCode="selectCode"></CitySelect>
                </el-form-item>
            </el-col>
            <el-col :span="5" >
                <el-form-item label="详细地址" >
                    <el-input placeholder="请输入详细地址" v-model="modelFromdata.consigneeAdds"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">付款信息</div>
        <el-row >
            <el-col :span="5">
                <el-form-item label="支付方式" >
                    <el-select v-model="modelFromdata.payChannel">
                        <el-option :value="1" label="支付宝"></el-option>
                        <el-option :value="2" label="预存款"></el-option>
                        <el-option :value="3" label="银行卡"></el-option>
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
                    <el-input placeholder="请选择"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="预存款可用余额">
                    <el-input placeholder="请输入收货电话号码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="支付类型" >
                    <el-select v-model="modelFromdata.payType">
                        <el-option :value="1" label="全额"></el-option>
                        <el-option :value="1" label="定金"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="备注信息" >
                    <el-input placeholder="请输入备注信息" v-model="modelFromdata.payRemark" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">订单信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="申请时间">
                    <el-date-picker
                            type="date"
                            v-model="modelFromdata.applyTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">附件信息</div>
        <el-row>
            <el-col :span="5">

            </el-col>
        </el-row>
        <div class="title" hidden>物流信息</div>
        <el-row hidden>
            <el-col :span="5">
                <el-form-item label="支付方式" >
                    <el-input placeholder="银行卡"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="实付金额">
                    <el-input placeholder="请输入实付金额(元)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="付款时间" >
                    <el-date-picker
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="收款账户" >
                    <el-input placeholder="请输入收款账户" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="代理商名称" >
                    <el-input placeholder="请选择"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="预存款可用余额">
                    <el-input placeholder="请输入收货电话号码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="支付类型" >
                    <el-select v-model="modelFromdata.payType">
                        <el-option :value="1" label="全额"></el-option>
                        <el-option :value="1" label="定金"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="备注信息" >
                    <el-input placeholder="请输入备注信息" v-model="modelFromdata.payRemark" ></el-input>
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
    export default {
        name: "ShippedAddModel",
        data(){
            return{
                modelFromdata:{
                    deviceTypeId:'',//设备类型
                    price:'',//单价
                    applyCount:'',//申请数量
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
                }
            }
        },
        methods:{
            //提交审核
            submitApply(){
                httpRequest("/deviceManage/deviceApply/saveDeviceDelivery","POST",this.modelFromdata)
                    .then(res=>{
                        console.log(res)
                    })
            },
            backrank(){
                this.$emit('backrank')
            },
            selectCode(e){
                this.modelFromdata.consigneeArea = e;
            },
        },
        components:{
            EquimentSelect,
            CitySelect
        }
    }
</script>

<style scoped>
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
