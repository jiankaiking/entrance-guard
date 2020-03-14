<template>
    <el-form class="message-shipped" label-width="75px">
        <el-form-item label="设备号:">
            <el-input v-model="modelFromdata.deviceNo"></el-input>
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
    import CommonSelect from "../../../components/select/CommonSelect";
    export default {
        name: "CashierBindModel",
        data(){
            return{
                modelFromdata:{
                    personInfoId:'',
                    deviceNo:'',
                    storeId:'',
                    sellerId:'',
                }
            }
        },
        components:{
            CommonSelect
        },
    }
</script>

<style scoped>
    .message-shipped {
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;

    }
</style>
