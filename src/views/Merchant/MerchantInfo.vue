<template>
    <el-form label-width="100px">
        <div class="title">基本信息</div>
        <el-row>
            <el-col :span="5" :offset="1">
                <el-form-item label="商户号">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="绑定手机">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="账号状态">
                    <el-col :span="17">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-button type="text">关停该账户</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="创建时间">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="登录密码">
                    <el-col :span="19">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="text">重置</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="登录密码">
                    <el-col :span="19">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="text">重置</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">经营信息</div>
        <el-row>
            <el-col :span="5"  :offset="1">
                <el-form-item label="商户全称">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="商户简称">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="行业类目">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="经营地址">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="客服电话">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">联系人信息</div>
        <el-row>
            <el-col :span="5"  :offset="1">
                <el-form-item label="姓名">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="手机号">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1">
                <el-form-item label="邮箱">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">归属关系</div>
        <el-row>
            <el-col :span="5"  :offset="1">
                <el-form-item label="服务商">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "MerchantInfo"
    }
</script>

<style scoped>

</style>
