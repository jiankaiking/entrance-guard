<template>
    <el-form label-width="120px">
        <el-form-item label="公告主题">
            <span>{{modelFromdata.subject}}</span>
        </el-form-item>
        <el-form-item label="公告类型">
            <span>{{modelFromdata.newsType}}</span>
        </el-form-item>
        <el-form-item label="发布机构">
            <span>{{modelFromdata.newsType}}</span>
        </el-form-item>
        <el-form-item label="发布时间">
            <span>{{modelFromdata.createTime}}</span>
        </el-form-item>
        <el-form-item label="内容">
            <span>{{modelFromdata.content}}</span>
        </el-form-item>
        <el-form-item>
           <el-button @click="close">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "AnnouncementModel",
        data(){
            return{
                modelFromdata:{

                }
            }
        },
        methods:{
            close(){
                this.$emit('close')
            },
            edit(row){
                console.log(row)
                this.modelFromdata = Object.assign(row,this.modelFromdata)
            },
        },


    }
</script>

<style scoped>

</style>
