<template>
    <el-form class="business-form allinpay" label-width="200px">
        <div class="title">基本信息</div>
        <el-row>
            <el-col :span="10">
                <el-form-item label="商户名称">
                    <el-input placeholder="如果有营业执照，请与营业执照的名称一致"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="商户简称">
                    <el-input placeholder="请输入名称+主营（如花脸便利店）"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="所属员工">
                    <el-input placeholder="请选择所属员工"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="联系人">
                    <el-input placeholder="例: 张三"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="联系电话">
                    <el-input placeholder="例: 17777777777"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="邮箱">
                    <el-input placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="地址">
                        <el-col :span="7"><el-select></el-select></el-col>
                        <el-col :span="8" :offset="1"><el-select></el-select></el-col>
                        <el-col :span="7" :offset="1"><el-select></el-select></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="详细地址">
                    <el-input placeholder="例: 白杨街道"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="地址">
                    <el-input placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="开通账户">
                    <el-radio-group>
                        <el-radio>微信</el-radio>
                        <el-radio>支付宝</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <div>开启微信支付</div>
        <el-form-item label="账号类型">
            <el-radio-group>
                <el-radio>企业用户</el-radio>
                <el-radio>个体工商户</el-radio>
                <el-radio>事业单位</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-row>
            <el-col :span="10">
                <el-form-item label="经营类目">
                    <el-col :span="7"><el-select></el-select></el-col>
                    <el-col :span="8" :offset="1"><el-select></el-select></el-col>
                    <el-col :span="7" :offset="1"><el-select></el-select></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="3" :offset="1">
               <p style="color: #38B8EE; line-height: 40px"> 如何正确的选择经营类目？</p>
            </el-col>
        </el-row>
        <div class="title">法人信息</div>
        <el-row>
            <el-col :span="10">
                <el-form-item label="法人姓名">
                    <el-input placeholder="如果有营业执照，请与营业执照的名称一致"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">结算信息</div>
        <el-row>
            <el-col :span="10">
                <el-form-item label="商户名称">
                    <el-input placeholder="如果有营业执照，请与营业执照的名称一致"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-form-item label="商户简称">
                    <el-input placeholder="请输入名称+主营（如花脸便利店）"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="户名">
                    <el-input placeholder="如果有营业执照，请与营业执照的名称一致"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">广告服务条款</div>
        <el-form-item label-width="50px">
            <el-checkbox v-model="checked">我已阅读同意</el-checkbox>
            <span style="color: #38B8EE">《脸云广告-广告主合作协议》</span>
        </el-form-item>
        <el-form-item>
            <div style="margin: 0 auto; width: 300px;">
                <el-button>取消</el-button>
                <el-button>提交审核</el-button>
            </div>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        name: "Alipay"
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
