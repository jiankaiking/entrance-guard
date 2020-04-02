<template>
    <div class="business-form" v-if="tableMsg">
        <div class="title">商户信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>商户类型</span>
                        <span v-if="tableMsg.incomType == '1'">小微</span>
                        <span v-if="tableMsg.incomType == '2'">企业</span>
                        <span v-if="tableMsg.incomType == '3'">快速</span>
                        <span v-if="tableMsg.incomType == '4'">个体工商户</span>
                    </li>
                    <li><span>商户名称</span><span>{{tableMsg.mercNm}}</span></li>
                    <li><span>联系人</span><span>{{tableMsg.stoeCntNm}}</span></li>
                    <li><span>地址</span><span>{{tableMsg.stoeAreaAddr}}</span></li>
                    <li><span>邮箱</span><span>{{tableMsg.mailbox}}</span></li>
                    <li><span>费率</span><span>{{tableMsg.rateList}}</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>经营类目</span><span>{{tableMsg.mccName}}</span></li>
                    <li><span>商户简称</span><span>{{tableMsg.scanStoeCnm}}</span></li>
                    <li><span>联系电话</span><span>{{tableMsg.stoeCntTel}}</span></li>
                    <li><span>详细地址</span><span>{{tableMsg.stoeAdds}}</span></li>
                    <li><span>营业执照号</span><span>{{tableMsg.comBusLicNo}}</span></li>
                    <li><span>商户号</span><span>{{tableMsg.comBusLicNo}}</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">账号信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>登录账号</span><span>{{tableMsg.mobile}}</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>登录密码</span><span>{{tableMsg.loginPwd}}</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">银行信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>结算类型</span><span>{{tableMsg.settleType == 1?'非法人结算':'法人结算'}}</span></li>
                    <li><span>开户银行</span><span>{{tableMsg.bankName}}</span></li>
                    <li><span>开户支行</span><span>{{tableMsg.branchBankName}}</span></li>
                    <li><span>银行卡号</span><span>{{tableMsg.stlOac}}</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>账户类型</span><span>{{tableMsg.stlSign == 0?'对公':'对私'}}</span></li>
                    <li><span>开户所在地</span><span>{{tableMsg.bankAddr}}</span></li>
                    <li><span>账户名</span><span>{{tableMsg.bankAcnm}}</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">法人信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>法人姓名</span><span>{{tableMsg.fullName}}</span></li>
                    <li><span>身份证到期日</span><span>{{tableMsg.idCardEndDate}}</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>法人身份证</span><span>{{tableMsg.idCardEndDate}}</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">平台信息</div>
        <el-row>
            <el-col :span="11">
                <ul class="show-table">
                    <li><span>所属代理商</span><span>{{tableMsg.agentName}}</span></li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="2">
                <ul class="show-table">
                    <li><span>开通时间</span><span>{{tableMsg.openTime}}</span></li>
                </ul>
            </el-col>
        </el-row>
        <div class="title">附件材料</div>
        <el-row>
            <ul class="show-image" v-if="tableMsg.newLandImg">
                <li><img :src="tableMsg.newLandImg.bankCardPhoto" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.cashierPhoto" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.comBusUrl" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.idCardFront" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.idCardReverse" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.scenePhoto" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.settleIdcardContrary" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.settleIdcardFront" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li><img :src="tableMsg.newLandImg.storePhoto" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
                <li v-for="item in tableMsg.newLandImg.settlPhoto">
                    <img :src="item" alt="">
                    <div class="imgText">法人身份证正面照</div>
                </li>
            </ul>
        </el-row>
        <div class="back-button"><el-button @click="back">返回</el-button></div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    export default {
        name: "NewLandAudit",
        data(){
            return{
                tableMsg:{
                    incomType:1,
                    newLandImg:{}
                }
            }
        },
        mounted() {
            let e = this.$route.query;
            httpRequest("/sellerManagement/newLand/getNewLandInfo","GET",{channelId:e.channelId,sellerId:e.sellerId})
                .then(res=>{
                    this.tableMsg = res.data;
                })
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .back-button{
        width: 100%; text-align: center; margin-top: 80px;
    }
    .show-image{
        display: flex; justify-content: flex-start; flex-wrap: wrap;
    }
    .show-image li{
        background: #ffffff; width: 150px; height: 84px; border: 1px solid #CACACA; margin-left: 22px; margin-bottom: 50px;
    }
    .show-image img{
        width: 150px; height: 84px; display: block;
    }
    .show-image .imgText{
        text-align: center; line-height: 25px;
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



