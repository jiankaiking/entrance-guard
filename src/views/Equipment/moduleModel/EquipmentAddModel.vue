<template>
    <div class="center-container">
        <el-form label-width="110px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="设备型号名称">
                        <el-input placeholder="请输入设备型号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="厂商">
                        <el-input placeholder="请输入设备型号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="价格">
                        <el-input placeholder="请输入设备价格"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="设置阶梯价格">
                        <el-row>
                            <el-col>
                                <el-checkbox>是否设置阶梯价格</el-checkbox>
                                <el-button type="text" style="margin-left: 50px">
                                    <i class="el-icon-circle-plus-outline el-icon--left"></i>新增一条规则
                                </el-button>
                            </el-col>
                            <el-col>
                                单次满
                                <el-input style="width: 50px;"></el-input>
                                件,每件价格为￥
                                <el-input style="width: 50px;"></el-input>
                                <i class="del-image"><img src="../../../assets/images/del.png" alt=""/></i>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="设备图片">
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
                <el-col :span="8">
                    <el-form-item label="适用行业说明">
                        <el-input type="textarea"
                                  :rows="4"
                                  placeholder="请输入适用行业说明"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item style="margin-top: 67px;">
                <el-button @click="backrank">返回</el-button>
                <el-button style="margin-left: 60px">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "EquipmentAddModel",
        data() {
            return {}
        },
        methods:{
            backrank(){
                this.$emit('backrank')
            },
        }
    }
</script>

<style scoped>
    .center-container {
        background: #ffffff;
        padding: 40px 150px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .avatar-uploader {
        width: 150px;
        height: 150px;
    }

    .avatar {
        width: 150px;
        height: 150px;
    }

    .el-form-item {
        padding-bottom: 0;
    }

    .avatar-uploader-icon {
        width: 150px;
        height: 150px;
        line-height: 150px;
    }

    .del-image img {
        width: 24px;
        height: 24px;
        margin-top: 10px;
        margin-left: 30px;
    }

</style>
