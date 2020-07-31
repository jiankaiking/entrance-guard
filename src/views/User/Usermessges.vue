<template>
    <div class="userMessges clear" v-loading="loading">
        <div class="user-via">
            <el-image
                    style="width: 80px; height: 80px"
                    :src="userMsg.userIcon"
                    :preview-src-list="[userMsg.userIcon]">
            </el-image>
<!--            <img :src="userMsg.userIcon" alt="">-->
        </div>
        <div class="userMessges-all">
            <div class="userButton">
                <el-upload
                        :action="uploadImg"
                        :show-file-list="false"
                        :headers="myHeaders"
                        :on-success="handleAvatarSuccess">
                    <el-button type="primary" plain class="myDefult-btn-plan">更换头像</el-button>
                </el-upload>

<!--                <el-button style="margin-left: 50px">注销登录</el-button>-->
            </div>
            <el-form label-width="80px">
                <el-form-item >
<!--                    <i style="color: #333333;font-size: 28px; margin-right: 22px" class="el-icon-edit-outline"></i>-->
<!--                    <el-button type="text">修改密码</el-button>-->
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="用户名">
                            <el-input v-model="userMsg.userName" readonly ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <el-form-item label="手机号">
                            <el-input v-model="userMsg.phone" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="邮箱">
                            <el-input v-model="userMsg.loginEmail" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <el-form-item label="部门">
                            <el-input :value="userMsg.organName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="创建时间">
                            <el-input :value="userMsg.createTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <el-form-item label="所属角色">
                            <el-input :value="userMsg.roleName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="首页设置">
                    <div>
                        <el-checkbox true-label="1" false-label="0" v-model="userMsg.isShowCommonFunc">常用功能
                        </el-checkbox>
                    </div>
                    <div>
                        <el-checkbox true-label="1" false-label="0" v-model="userMsg.isShowHotNews">热门新闻</el-checkbox>
                    </div>
                    <div>
                        <el-checkbox true-label="1" false-label="0" v-model="userMsg.isShowQrcode">常用二维码</el-checkbox>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="button-cont">
                        <el-button style="margin-right: 70px" @click="back">取消</el-button>
                        <el-button @click="saveInfo">保存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import {mapMutations} from 'vuex'

    export default {
        name: "Usermessges",
        data() {
            return {
                userMsg: {},
                loading:false,
                myHeaders: {Authorization: this.$store.state.token},
                uploadImg: '/api' + '/managecenter/upload/uploadImg',
            }
        },
        mounted() {
            window.document.body.style.backgroundColor = '#fff'
            this.getInfo()
        },

        methods: {
            ...mapMutations(['SET_USERINFO']),
            getInfo() {
                httpRequest("/managecenter/index/getUserInfo", "GET")
                    .then(res => {
                        if (res.success) {
                            this.userMsg = res.data;
                            // let data = JSON.stringify(this.userMsg)

                            this.SET_USERINFO(res.data)
                        }
                    })
            },
            saveInfo() {
                this.loading = true
                let data = {
                    isShowCommonFunc: this.userMsg.isShowCommonFunc,
                    isShowHotNews: this.userMsg.isShowHotNews,
                    isShowQrcode: this.userMsg.isShowQrcode,
                    userIcon: this.userMsg.userIcon
                }
                httpRequest("/managecenter/index/updateUserInfo", "POST", data)
                    .then(res => {
                        if (res.success) {
                            this.$message.success(res.msg)
                            this.getInfo()
                        }
                    })
                    .finally(res=>{
                        this.loading = false
                    })
            },
            handleAvatarSuccess(e) {
                this.userMsg.userIcon = e.data;
            },
            back() {
                this.$router.go(-1)
            },
        }
    }
</script>


<style scoped lang="scss">
    .button-cont {
        margin: 100px 60px;
        width: 300px;

        button {
            width: 100px;
            height: 36px;
        }
    }

    .userMessges {

        background-color: #ffffff;
        padding: 20px 40px 20px 0;

        .user-via {
            margin-right: 30px;
            float: left;
            width: 90px;
            height: 90px;

            img {
                display: block;
                width: 90px;
                height: 90px;
            }
        }

        .userMessges-all {
            float: left;
            width: 80%;

            .userButton {
                height: 90px;
                display: flex;
                align-items: center;

                button {
                    width: 100px;
                    height: 36px;
                    margin-top: 27px;
                }
            }
        }
    }
</style>
