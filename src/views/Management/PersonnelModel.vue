<template>
    <el-form  ref="form" :model="modelFromdata" style="padding: 0 50px; box-sizing: border-box" label-width="120px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="头像:">
                    <div style="display: flex; align-items: center;">
                        <el-upload
                                style="margin: 0 15px;"
                                :action="url.uploadImg"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                        >
                            <img v-if="modelFromdata.staffPhotos" :src="modelFromdata.staffPhotos" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>点击选择头像</span>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="真实姓名:">
                    <el-input v-model="modelFromdata.staffFullName" placeholder="请输入"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="用户名:">
                    <el-input v-model="modelFromdata.loginUserName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="昵称(花名):">
                    <el-input v-model="modelFromdata.staffAlias"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="性别:">
                    <el-radio-group v-model="modelFromdata.staffSex">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号:">
                    <el-input v-model="modelFromdata.loginPhone"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="初始密码:">
                    <el-input v-model="modelFromdata.initialPassWord"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="organ-from">
                <el-form-item label="所属部门:">
                    <el-select style="width:48%" v-model="modelFromdata.organId" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select
                            v-model="modelFromdata.organId"
                            style="width:48%;margin-left:3%"
                            collapse-tags
                            placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="入职时间:">
                    <el-date-picker
                            v-model="modelFromdata.entryTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="生日:">
                    <el-date-picker
                            v-model="modelFromdata.staffBirthday"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="邮箱:">
                    <el-input v-model="modelFromdata.loginEmail"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="状态:">
                    <el-radio-group v-model="modelFromdata.staffStatus">
                        <el-radio label="0">停用</el-radio>
                        <el-radio label="1">正常</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <div class="center-button">
                <el-button @click="close">取消</el-button>
                <el-button class="app-button" @click="handleOk">确认</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import abc from '@/assets/images/77.png'
    import BASE_URL from '../../api/config'
    import httpRequest from "../../api/api";

    export default {
        name: "PersonnelModel",
        data() {
            return {

                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }],
                modelFromdata: {
                    staffPhotos: abc,
                    staffFullName: '',//真实姓名
                    loginUserName: '',//用户名（登录
                    staffAlias: '',//花名
                    loginPhone: '',//手机号
                    initialPassWord: '',//初始密码
                    staffSex: '',//性别（0 女 1 男）
                    staffStatus: '',//状态（0 停用 1 启用）
                    organId: '',//机构id 所属部门id
                    position: '',//职位
                    entryTime: '',//入职时间
                    staffBirthday: '',//生日
                    loginEmail: '',//邮箱
                },
                url: {
                    add: '/staffManage/addStaff',
                    info: '/staffManage/getStaffInfo',
                    edit: '/staffManage/editStaffInfo',
                    uploadImg: BASE_URL + '/upload/uploadImg',
                },
            }
        },
        methods: {
            getOrganInfo() {
                httpRequest('/organManage/getOrganInfo', 'get')
            },

            //正面照
            handleAvatarSuccess(res) {
                this.modelFromdata.staffPhotos = res.data
            },


            add() {
                for(var key in this.modelFromdata){
                    this.modelFromdata[key] = ""
                }
            },
            edit(record) {
                this.$refs.form.resetFields()

                // 员工详情
                httpRequest(this.url.info, 'get', {staffId: record.staffId})
                    .then(res => {
                        delete res.data.organName;
                        this.modelFromdata = res.data;
                    })
            },
            close() {
                this.$emit('close');
            },
            handleOk() {
                const that = this;
                // 触发表单验证
                httpRequest(this.url.add, 'post', this.modelFromdata)
                    .then((res) => {
                        if(res.success){
                            that.$message.success("修改成功")
                        }
                    })
                    .finally(() => {
                        that.close();
                    })

            },
        },

    }
</script>
<style>
    .organ-from .el-select {
        width: 48% !important;
    }

</style>


<style scoped>
    .avatar {
        width: 50px;
        height: 50px;
    }

    .center-button {
        width: 300px;
        margin: 0 auto;
        padding-top: 50px;
    }
    .center-button button {
        width: 100px;
        height: 36px;
    }
    .center-button .app-button {
        background-color: #38B8EE;
        color: #ffffff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
</style>
