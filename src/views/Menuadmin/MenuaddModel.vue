<template>

    <el-form ref="form" :model="form" label-width="80px" style="padding: 0 30px; box-sizing: border-box;">
        <el-form-item label="*上级菜单">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*菜单类型">
            <el-radio-group v-model="radio">
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="*菜单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*请求地址">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="链接目标">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
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
        <el-form-item label="显示排序">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="*菜单类型">
            <el-radio-group v-model="radio">
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="链接目标">
            <el-input type="textarea" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'menuaddmodel',
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        }
    }

</script>

<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .avatar {
        width: 50px;
        height: 50px;
        display: block;
    }
</style>
