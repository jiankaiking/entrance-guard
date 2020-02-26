<template>
    <el-form label-width="100px">
        <el-row>
            <el-col :span="10">
                <el-form-item label="代理商名称">
                    <el-input placeholder="请选择" />
                </el-form-item>
                <el-form-item label="赠送数量">
                    <el-input placeholder="请输入设备数量" />
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="快递单图">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="赠送原因">
                    <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="设备SN码">
                    <el-input placeholder="请输入设备SN码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="发货厂商">
                    <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="收货人">
                    <el-input placeholder="请输入收货人姓名"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="快递单号">
                    <el-input placeholder="请输入快递单号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="收货地址">
                    <el-input placeholder="请输入设备SN码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item label="快递公司">
                    <el-input placeholder="请输入快递公司"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form-item label="详细地址">
                    <el-input placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label-width="0">
            <el-button>取消</el-button>
            <el-button>保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "PresentModel"
    }
</script>

<style scoped>
   .avatar-uploader{
       width: 100px; height: 100px;
   }
    .avatar{
        width: 100px; height: 100px;
    }
   .el-form-item{
       padding-bottom: 0;
   }
    .avatar-uploader-icon{
        width: 100px; height: 100px; line-height: 100px;
    }
</style>
