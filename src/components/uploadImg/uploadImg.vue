<template>
    <el-upload
            class="avatar-uploader"
            :action="uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1">
        <img v-if="imgUrl" :src="imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
    import BASE_URL from '../../api/config'
    export default {
        name: "uploadImg",
        props:{
          imgUrl:{

          }
        },
        data(){
            return{
                uploadImg:BASE_URL + '/upload/uploadImg',
            }
        },
        methods:{
            handleAvatarSuccess1(e){
                this.$emit("update:imgUrl",e.data)
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>
