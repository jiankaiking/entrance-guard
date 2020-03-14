<template>
    <el-select v-model="value" @change="changeValue" placeholder="请选择">
        <el-option
                v-for="item in typeArr"
                :key="item.dataValue"
                :label="item.dataCode"
                :value="item.dataValue">
        </el-option>
    </el-select>
</template>

<script>
    import httpRequest from "../../api/api";
    export default {
        name: "CommonSelect",
        props:{
            type:{
                type:String,
                required:true
            },
            value:{
                required:true
            },
        },
        data(){
            return{
                typeArr:[],
            }
        },
        mounted(){
            this.getTypeArr()
        },
        methods:{
            getTypeArr(){
                httpRequest("/sysDict/getDataListByType","GET",{dataType:this.type})
                    .then(res=>{
                        this.typeArr = res.data;
                    })
            },
            changeValue(e){
                this.$emit("update:value",e)
            },
        },
    }
</script>

<style scoped>

</style>
