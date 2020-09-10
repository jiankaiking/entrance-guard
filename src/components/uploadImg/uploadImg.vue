<template>
    <div style="width: 148px; height: 148px; overflow:hidden;">
        <el-upload
                :action="uploadImg"
                list-type="picture-card"
                :headers="myHeaders"
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-preview="handlePictureCardPreview"
                :on-success="handleAvatarSuccess1">
            <i class="el-icon-plus avatar avatar-uploader-icon"></i>
        </el-upload>
        <!--            <img v-if="imgUrl" :src="imgUrl" class="avatar">-->
        <span><slot name="bottom"></slot></span>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "uploadImg",
        props: {
            imgUrl: {}
        },
        data() {
            return {
                myHeaders: {Authorization: this.$store.state.token},
                uploadImg: 'api' + '/managecenter/upload/uploadImg',
                dialogImageUrl: '',
                fileList:[],
                dialogVisible: false
            }
        },
        methods: {
            handleAvatarSuccess1(e) {
                this.dialogImageUrl = e.data;
                this.$emit("update:imgUrl", e.data)
            },
            handleRemove(file, fileList) {
                this.$emit("update:imgUrl", '')
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        watch:{
            imgUrl: {
                handler(val, oldName) {
                    this.dialogImageUrl = val
                    if(val){
                        this.fileList = [{url:val}]
                    }else{
                        this.fileList = []
                    }
                },
                immediate: true
            },
        }
    }
</script>

<style scoped>

</style>
