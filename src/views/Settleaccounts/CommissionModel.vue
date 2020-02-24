<template>
    <div class="commission-container">
        <el-form label-width="80px">
            <div class="title">申请信息</div>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">申请信息</div>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="关于发票">
                        <el-input disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item style="margin-top: 60px">
                <el-button>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "CommissionModel"
    }
</script>

<style scoped>
    .commission-container {
        background: #ffffff;
        padding: 25px 0px 25px 25px;
        box-sizing: border-box;
        border-radius: 8px;
    }
    .commission-container .title {
        position: relative;
        text-align: left;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;
    }
    .commission-container .title:before {
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
