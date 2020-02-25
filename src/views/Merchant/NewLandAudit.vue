<template>
    <div class="business-form">
        <div class="title">商户信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>商户类型</span><span>321321</span></li>
                    <li><span>商户名称</span><span>321321</span></li>
                    <li><span>联系人</span><span>321321</span></li>
                    <li><span>地址</span><span>321321</span></li>
                    <li><span>邮箱</span><span>321321</span></li>
                    <li><span>费率</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>经营类目</span><span>321321</span></li>
                    <li><span>商户简称</span><span>321321</span></li>
                    <li><span>联系电话</span><span>321321</span></li>
                    <li><span>详细地址</span><span>321321</span></li>
                    <li><span>营业执照号</span><span>321321</span></li>
                    <li><span>商户号</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">账号信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>登录账号</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>登录密码</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">银行信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>结算类型</span><span>321321</span></li>
                    <li><span>开户银行</span><span>321321</span></li>
                    <li><span>开户支行</span><span>321321</span></li>
                    <li><span>银行卡号</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>账户类型</span><span>321321</span></li>
                    <li><span>开户所在地</span><span>321321</span></li>
                    <li><span>账户名</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">法人信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>法人姓名</span><span>321321</span></li>
                    <li><span>身份证到期日</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>法人身份证</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">平台信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>所属代理商</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>开通时间</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">附件材料</div>
        <el-row>
            <ul class="show-image">
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
            </ul>
        </el-row>
        <div class="back-button"><el-button>返回</el-button></div>
    </div>
</template>

<script>
    export default {
        name: "NewLandAudit"
    }
</script>

<style scoped>
    .back-button{
        width: 100%; text-align: center; margin-top: 80px;
    }
    .show-image{
        display: flex;
    }
    .show-image li{
        background: #ffffff; width: 150px; height: 84px; border: 1px solid #CACACA; margin-left: 22px;
    }
    .business-form {
        padding: 25px 50px;
    }
    .show-table li {
        display: flex;
        border-bottom: 1px solid #CACACA;
    }
    .show-table span{
        text-align: center; line-height: 56px;
    }
    .show-table span:first-child{
        border-right: 1px solid #CACACA;
        width: 224px;
    }
    .show-table span:last-child{
        width: 100%;
    }
    .show-table {
        margin-bottom: 25px; color: #333333; font-size: 16px;
        border: 1px solid #CACACA; border-bottom: none;  border-radius: 8px;
    }
    .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }
    .title::before {
        position: absolute;
        content: '';
        left: 0;
        top: 2px;
        width: 9px;
        height: 21px;
        background: linear-gradient(180deg, rgba(255, 42, 0, 1) 0%, rgba(237, 115, 70, 1) 100%);
        border-radius: 5px;
    }
</style>
