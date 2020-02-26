<template>
    <el-form label-width="100px">
        <el-form-item label="入库单号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="设备型号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="厂商名称">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="进货单价">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="设备数量">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="入库时间">
            <el-date-picker
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <el-button>取消</el-button>
            <el-button>保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "EquipmentAddModel"
    }
</script>

<style scoped>

</style>
