<template>
    <div class="agent-message">
        <el-form ref="form" label-width="100px">
            <div class="title">基本信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="商户号">
                        <el-input :value="mechantInfo.sellerCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="绑定手机">
                        <el-input :value="mechantInfo.mobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="账号状态">
                        <el-input :value="mechantInfo.accountStatus == 0?'停用':'启用'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="开通时间">
                        <el-input :value="mechantInfo.createTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">经营信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="商户全称">
                        <el-input :value="mechantInfo.mercNm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商户简称">
                        <el-input :value="mechantInfo.scanStoeCnm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="经营类目">
                        <el-input :value="mechantInfo.mccInfo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="经营地址">
                        <el-input :value="mechantInfo.area"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="客服电话">
                        <el-input :value="mechantInfo.customerTelphone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">联系人信息</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input :value="mechantInfo.stoeCntNm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号">
                        <el-input :value="mechantInfo.stoeCntTel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="邮箱">
                        <el-input :value="mechantInfo.mailbox"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">归属关系</div>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="服务商">
                        <el-input :value="mechantInfo.agentName"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>
    </div>
</template>

<script>
    import httpRequest from "../../../api/api";

    export default {
        data() {
            return {
                mechantInfo: {}
            }
        },
        mounted() {
            this.getMechantInfo()
        },
        methods: {
            getMechantInfo() {
                httpRequest("/sellerManagement/sellerMange/getSellerInfo", "GET", {sellerId: this.$route.query.id})
                    .then(res => {
                        if (res.success) {
                            this.mechantInfo = res.data;
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .agent-message {
        background: #ffffff;
        padding: 25px 80px 200px 25px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        border-radius: 8px;

    }
</style>
