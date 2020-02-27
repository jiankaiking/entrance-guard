<template>
    <div class="business-form">
        <div class="title">商户信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>商户号</span><span>321321</span></li>
                    <li><span>商户名</span><span>321321</span></li>
                    <li><span>商户性质</span><span>321321</span></li>
                    <li><span>注册资本</span><span>321321</span></li>
                    <li><span>经营区域</span><span>321321</span></li>
                    <li><span>营业执照名称</span><span>321321</span></li>
                    <li><span>营业证件有效期</span><span>321321</span></li>
                    <li><span>是否三证合一</span><span>321321</span></li>
                    <li><span>组织机构代码证有效期</span><span>321321</span></li>
                    <li><span>法人姓名</span><span>321321</span></li>
                    <li><span>法人身份证有效期</span><span>321321</span></li>
                    <li><span>客服电话</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>所在省市</span><span>321321</span></li>
                    <li><span>商户简称</span><span>321321</span></li>
                    <li><span>所属行业</span><span>321321</span></li>
                    <li><span>员工数量</span><span>321321</span></li>
                    <li><span>经营地段</span><span>321321</span></li>
                    <li><span>营业证件号码</span><span>321321</span></li>
                    <li><span>注册地址</span><span>321321</span></li>
                    <li><span>组织机构代码证号</span><span>321321</span></li>
                    <li><span>法人代表证件类型</span><span>321321</span></li>
                    <li><span>法人代表证件号</span><span>321321</span></li>
                    <li><span>法人手机号</span><span>321321</span></li>
                    <li><span></span><span>-</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">结算信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>结算方式</span><span>321321</span></li>
                    <li><span>卡折类型</span><span>321321</span></li>
                    <li><span>账户名</span><span>321321</span></li>
                    <li><span>开户市</span><span>321321</span></li>
                    <li><span>支付行号</span><span>321321</span></li>
                    <li><span>非法人结算人证件号</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>账户类型</span><span>321321</span></li>
                    <li><span>账户号</span><span>321321</span></li>
                    <li><span>开户省</span><span>321321</span></li>
                    <li><span>所属银行</span><span>321321</span></li>
                    <li><span>结算时间</span><span>321321</span></li>
                    <li><span>对公账户信息</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">产品信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>微信支付费率</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>支付宝支付费率</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">平台信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>登录账号</span><span>321321</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>所属员工</span><span>321321</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">附件照片(个人)</div>
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
        name: "AlinpayAudit"
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
</style>
