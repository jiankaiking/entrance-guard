<template>
    <div class="message-shipped">
        <div>
            <i class="el-icon-success"></i>
            <p style="color: #333333; font-size: 18px;margin-top: 14px;">上架成功</p>
        </div>
        <div>
            <el-form label-width="75px">
                <el-form-item label="实付金额:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="付款时间:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="收款账户:">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="备注信息:">
                    <el-input></el-input>
                </el-form-item>
                    <el-button>确定</el-button>
            </el-form>
        </div>
        <div>
               <el-input type="textarea"
                         :rows="4"
                         placeholder="请输入内容"></el-input>
            <el-button style="margin-top: 30px">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessagesBox"
    }
</script>

<style scoped>
    .message-shipped {
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;

    }

    .el-icon-success {
        color: #67C23B;
        font-size: 44px;
    }
</style>
