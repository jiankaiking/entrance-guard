<template>
    <el-form label-width="80px" :model="modelFromdata" style="padding: 0 80px; box-sizing: border-box">
        <el-form-item label="参数Id">
            <el-input  disabled v-model="modelFromdata.paramId"></el-input>
        </el-form-item>
        <el-form-item label="参数名">
            <el-input  disabled v-model="modelFromdata.paramName"></el-input>
        </el-form-item>
        <el-form-item label="参数值">
            <el-input  v-model="modelFromdata.paramValue"></el-input>
        </el-form-item>
        <el-form-item label="所属模块">
            <el-input  v-model="modelFromdata.paramModule"></el-input>
        </el-form-item>
        <el-form-item label="说明">
            <el-input v-model="modelFromdata.paramDesc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleOk">确定保存</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import httpRequest from "../../api/api";

    export default {
        name: "ParameterModel",
        data() {
            return {
                modelFromdata:{},
                input:'',
                url:{
                    info:'/paramManage/getParamInfo',
                    add:'/paramManage/updateParam',
                },
            }
        },
        methods:{
            edit(record) {
                // 员工详情
                httpRequest(this.url.info, 'get', {paramId: record.paramId})
                    .then(res => {
                        this.modelFromdata = res.data;
                    })
            },
            close(){
                this.$emit('close');
            },
            handleOk() {
                const that = this;
                // 触发表单验证
                httpRequest(this.url.add, 'post', this.modelFromdata)
                    .then((res) => {
                        if(res.success){
                            that.$message.success("修改成功")
                            that.$emit('ok');
                        }
                    })
                    .finally(() => {
                        this.$emit('close');
                    })

            },
        },
    }
</script>

<style scoped>

</style>
