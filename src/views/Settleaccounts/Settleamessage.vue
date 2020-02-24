<template>
    <div class="settleamessage-container">
        <el-form label-width="130px">
            <div class="title">代理商信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="代理商名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系人">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="代理区域">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">结算信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="佣金结算金额">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="佣金结算时间">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="设备补贴结算金额">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="设备补贴结算时间">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="活动补贴结算金额">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="活动补贴结算时间">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="活动补贴结算时间">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">申请信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="申请时间">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="快递单号">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款人">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款银行">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="收款账户">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="关于发票">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i><span
                                class="upload-text">上传图片</span>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form-item>
            <div class="instructions">
                <p><label>应结金额:</label>若有发票，则应结金额 = 申请结算金额</p>
                <p>若无发票，则应结金额 = 申请结算金额*(100 - 16%)</p>
                <p>无发票，需扣除16个税点</p>
            </div>
            <el-form-item>
                <div style="margin: 130px auto 0; width: 500px;">
                    <el-button type="info">返回</el-button>
                    <el-button type="primary" style="margin:0 90px">驳回</el-button>
                    <el-button type="success">结算1</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Settleamessage"
    }
</script>

<style scoped>
    .instructions {
        height: 114px;
        margin-left: 80px;
        width: 465px;
        padding: 23px 33px 23px 105px;
        box-sizing: border-box;
        background: #f8f8f8;
        border-radius: 8px;
    }
    .instructions p {
        color: #333333;
        font-size: 14px;
    }
    .instructions p:first-child {
        position: relative;
    }
    .instructions p label {
        position: absolute;
        left: -65px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 70px;
        height: 100px;
        line-height: 100px;
        text-align: right;
    }

    .upload-text {
        display: inline-block;
        width: 90px;
        height: 100px;
        line-height: 100px;
        vertical-align: top;
        color: #8c939d;
    }

    .avatar {
        width: 160px;
        height: 100px;
        display: block;
    }

    .settleamessage-container {
        background: #ffffff;
        padding: 25px 80px 25px 25px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        border-radius: 8px;
    }
    .settleamessage-container .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }
    .settleamessage-container .title:before {
        position: absolute;
        content: "";
        left: 0;
        top: 2px;
        width: 9px;
        height: 21px;
        background: linear-gradient(180deg, #ff2a00 0%, #ed7346 100%);
        border-radius: 5px;
    }
</style>
