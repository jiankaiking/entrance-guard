<template>
    <el-form label-width="90px">
        <div class="title">身份证照片</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="设备型号" >
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="单价(元)">
                    <el-input placeholder="请输入设备单价"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="数量(台)" >
                    <el-input placeholder="请设备设备数量"></el-input>
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
                    <el-input placeholder="请输入收货人姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="联系方式">
                    <el-input placeholder="请输入收货电话号码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="收货地址" >
                    <el-input placeholder="请选择"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="详细地址" >
                    <el-input placeholder="请输入详细地址" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">付款信息</div>
        <el-row >
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
                    <el-input placeholder="请选择支付状态"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="备注信息" >
                    <el-input placeholder="请输入备注信息" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">订单信息</div>
        <el-row>
            <el-col :span="5">
                <el-form-item label="申请时间">
                    <el-date-picker
                            type="date"
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
        <el-row>
            <el-col :span="5" :offset="9">
                <el-button @click="backrank">返回</el-button>
                <el-button style="margin-left: 80px">提交审核</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "ShippedAddModel",
        methods:{
            backrank(){
                this.$emit('backrank')
            },
        },
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
