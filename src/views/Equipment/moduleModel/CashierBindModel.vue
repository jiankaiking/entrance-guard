<template>
    <el-form class="message-shipped" label-width="75px">
        <el-form-item label="设备号:">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="商家:">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="门店:">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="收银员:">
            <el-input></el-input>
        </el-form-item>
        <el-button>确定</el-button>
    </el-form>
</template>

<script>
    export default {
        name: "CashierBindModel"
    }
</script>

<style scoped>
    .message-shipped {
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;

    }
</style>
