<template>
    <div class="contenner-add">
        <el-form>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="合作商">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="合作关系">
                        <el-input/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="合作商">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="合作关系">
                        <el-input/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="回调地址(合作商(商户后台))" label-width="300">
                        <el-col :span="15">
                            <el-input/>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="服务启动地址(合作商(代理后台域名))">
                        <el-col :span="15">
                            <el-input/>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="活动形式">
                <el-col :span="6">
                    <el-input type="textarea" :rows="10"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button>下载</el-button>
                <el-button>提交</el-button>
            </el-form-item>
            <el-form-item label="合作时间">
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center">-</el-col>
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="LOGO">

                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>

            </el-form-item>
            <el-form-item label="背景图片">
                <el-col :span="3">
                    <el-upload
                            class="avatar-uploader1"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item>
                <div style="margin: 0 auto; width: 200px">

                    <el-button>取消</el-button>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Addcooperative"
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

    .avatar-uploader1 {
        width: 160px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 28px;
        color: #8c939d;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .contenner-add {
        background: #ffffff;
        padding: 26px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;

    }
</style>
