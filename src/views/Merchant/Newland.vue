<template>
    <el-form class="business-form" label-width="140px">
        <div class="reject-status">
            <img src="../../assets/images/no.png" alt=""><span>结算原因：驳回原因</span>
        </div>
        <div class="title">基本信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="商户类型">
                    <el-input :value="newLandData.incomType"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="经营类目">
                    <el-input :value="newLandData.mccName"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="商户名称">
                    <el-input :value="newLandData.mercNm" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="商户简称">
                    <el-input :value="newLandData.scanStoeCnm" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="联系人">
                    <el-input :value="newLandData.stoeCntNm" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="联系电话">
                    <el-input :value="newLandData.stoeCntTel"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="邮箱">
                    <el-input :value="newLandData.mailbox"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="地址">
                    <el-input :value="newLandData.stoeAdds"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="详细地址">
                    <el-input :value="newLandData.stoeAreaCod"/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="营业执照号">
                    <el-input :value="newLandData.comBusLicNo"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="费率">
                    <el-input :value="newLandData.stoeAreaCod"/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="商户号">
                    <el-input :value="newLandData.sellerCode" />
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">账号信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="登录账号">
                    <el-input :value="newLandData.mobile" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="登录密码">
                    <el-input :value="newLandData.loginPwd" />
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">银行信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="结算类型">
                    <el-input :value="newLandData.settleType" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="账户类型">
                    <el-input :value="newLandData.stlSign" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="开户银行">
                    <el-input :value="newLandData.bankName" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="开户所在地">
                    <el-input :value="newLandData.bankAddrCode" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="银行卡号">
                    <el-input :value="newLandData.stlOac" />
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">法人信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="法人姓名">
                    <el-input :value="newLandData.fullName" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="法人身份证">
                    <el-input :value="newLandData.idCardNo" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="身份证到期日">
                    <el-input :value="newLandData.idCardEndDate" />
                </el-form-item>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-form-item label-width="0">
                    <el-checkbox>长期</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">平台信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="所属代理商">
                    <el-input :value="newLandData.agentName" />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="开通时间">
                    <el-input :value="newLandData.openTime" />
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">图片信息</div>
        <el-row class="info-img">
            <el-col :span="2">
                <img :src="newLandData.newLandImg.idCardReverse" alt="">
                <div class="imgText">法人身份证正面照</div>
            </el-col>
            <el-col :span="2">
                <img :src="newLandData.newLandImg.idCardFront" alt="">
                <div class="imgText">法人身份证背面照</div>
            </el-col>
            <el-col :span="2">
                <img :src="newLandData.newLandImg.comBusUrl" alt="">
                <div class="imgText">营业执照</div>
            </el-col>
            <el-col :span="2">
                <img :src="newLandData.newLandImg.storePhoto" alt="">
                <div class="imgText">门头照(商户与门店 合影照)</div>
            </el-col>
            <el-col :span="2">
                <img :src="newLandData.newLandImg.cashierPhoto" alt="">
                <div class="imgText">收银台照</div>
            </el-col>
            <el-col :span="2">
                <img :src="newLandData.newLandImg.scenePhoto" alt="">
                <div class="imgText">内景照</div>
            </el-col>
            <el-col :span="2">
                <img :src="newLandData.newLandImg.bankCardPhoto" alt="">
                <div class="imgText">银行卡照片</div>
            </el-col>
        </el-row>
        <div class="title">广告服务条款</div>
        <el-form-item label-width="50px">
            <el-checkbox :value="true">我已阅读同意</el-checkbox>
            <span style="color: #38B8EE">《脸云广告-广告主合作协议》</span>
        </el-form-item>
        <el-form-item>
            <div style="margin: 0 auto; width: 300px;">
                <el-button @click="back">取消</el-button>
                <el-button>提交审核</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import uploadImg from "../../components/uploadImg/uploadImg";
    import httpRequest from "../../api/api";

    export default {
        name: "Newland",
        data() {
            return {
                newLandData: {
                    newLandImg: {
                        cashierPhoto: '',
                        bankCardPhoto: '',
                    }
                },
            }
        },
        components: {
            uploadImg,
        },
        mounted() {
            let e = this.$route.query;
                httpRequest("/sellerManagement/newLand/getNewLandInfo","GET",{channelId:e.channelId,sellerId:e.sellerId})
                    .then(res=>{
                        if(res.success){
                            this.newLandData = res.data;
                            // this.newLandData = Object.assign(this.newLandData,res.data)
                        }
                    })
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>
    .top-select {
        color: #666666;
        margin-bottom: 30px;
    }
    .reject-status {
        margin: 15px 0;
        font-size: 16px;
        color: #FD6969;
        font-weight: bold;
    }

    .reject-status span {
        display: inline-block;
        vertical-align: top;
        line-height: 56px;
    }

    .reject-status img {
        width: 56px;
        margin-right: 15px;
        height: 56px;
    }

    .business-form {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        padding: 25px;
        box-sizing: border-box;
    }

    .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;

    }
.info-img img{ display:block; width: 100px; height: 100px}
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
