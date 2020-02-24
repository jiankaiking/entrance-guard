<template>
    <div class="loginMain">
        <div class="main-logo"><img src="../assets/images/loginlogo.png" alt=""></div>
        <div class="login-box">
            <h2 class="login-title">欢迎登录脸云物连</h2>
            <div class="loginCneter">
                <div class="login-logo">
                    <img src="../assets/images/loginlogo.png" alt="">
                </div>
                <!-- 扫码登录 -->
                <div class="sweep-login">
                    <p>{{sweepLogin?'扫码登录':'账号密码登录'}}</p>
                    <img @click="checkLogin" :src="sweepLogin?'1.jpg':'2.jpg'" alt="">
                </div>
                <div class="sweep-box" v-show="sweepLogin">
                    <p>扫一扫</p>
                    <img src="../assets/images/logo.png" alt="">
                </div>
                <!-- 扫码登录end -->

                <el-form v-show="!sweepLogin" label-width="0" ref="loginForm" :model="userInfor" :rules="rules"
                         style="padding-top: 20px">
                    <el-form-item prop="username">
                        <el-input placeholder="请输入账号" v-model="userInfor.username">
                            <i slot="prefix" class="el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码"  clearable v-model="userInfor.password">
                            <i slot="prefix" class="el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入验证码" v-model="userInfor.loginCode">
                            <i slot="prefix" class="el-icon-lock"></i>
                            <template slot="suffix">
                                <div class="login-code"><img src="../assets/images/logo.png" alt=""></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <div class="login-feature">
                        <div class="login-feature-left">
                            <el-checkbox v-model="saveAccount">保存用户和密码</el-checkbox>
                        </div>
                        <div class="login-feature-right">
                            <span @click="fogetPassword">忘记密码</span>
                        </div>
                    </div>
                </el-form>

                <div class="logingbtn">
                    <div class="btnLogin">
                        <el-button class="loginBtn" @click="onSubmit('loginForm')">登录</el-button>
                    </div>
                    <p class="developerNum">开发商加版本号</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
   import httpRequest from "../api/api";

    export default {
        name: "Login",
        data() {
            return {
                rules: {  //用户名密码验证
                    username: [{required: true, message: '账号不可为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不可为空', trigger: 'blur'}]
                },
                saveAccount: false,
                sweepLogin: false,  //扫码登录切换
                userInfor: {  //用户名密码，验证码
                    username: '',  //用户名
                    password: '', //密码
                    loginCode: '' //验证码
                },
            }
        },
        mounted() {
            httpRequest('/login/getValidateCode','POST')
            .then(res=>{
                console.log(res)
            })
        },
        methods: {
            //登录按钮  表单验证，验证成功 action提交
            onSubmit(fromName) {
                let _that = this;
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('Login', this.userInfor)
                        this.$router.push('/')
                    } else {
                        return false;
                    }
                });
            },

            //切换登录方式
            checkLogin() {
                this.sweepLogin = !this.sweepLogin
            },
            //忘记密码
            fogetPassword() {
                console.log(123)
                this.$router.push('/findpassword')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-icon-lock,.el-icon-user{
        font-size: 22px;
        margin-top: 8px;
        color: #979797;
    }
    .loginCneter {
        position: relative;
        .sweep-login {
            position: absolute;
            top: 0;
            right: 0;
            img {
                width: 50px;
                height: 50px;
                display: block;
            }
            p {
                font-size: 14px;
                color: #979797;
                line-height: 50px;
                float: left;
            }
        }
    }

    .login-code {
        width: 90px;
        height: 30px;
        margin: 5px 0;
        img {

            width: 90px;
            height: 30px;
        }
    }

    .sweep-box {
        text-align: center;
        img {
            margin: 48px auto;
            display: block;
            height: 120px;
            width: 120px;
        }
    }


    .btnLogin {
        padding: 0 60px;
        box-sizing: border-box;

    }
    .loginMain {
        width: 100%;
        height: 935px;
        background: url("../assets/images/loginbgc.png") no-repeat center;
        overflow: hidden;
        position: relative;

        .main-logo {
            position: absolute;
            top: 48px;
            left: 48px;

            img {
                display: block;
                width: 116px;
                height: 40px;
            }
        }

        .login-title {
            position: relative;
            top: -45px;
            font-size: 20px;
            left: -18px;
            color: #ffffff;
        }
    }

    .login-box {
        background: #ffffff;
        box-sizing: border-box;
        position: absolute;
        right: 582px;
        width: 493px;
        margin: 215px auto 160px;
        padding: 0px 35px 15px 35px;
        border-radius:10px;
        .el-form-item {
            padding: 0 60px 25px;
        }

        .login-logo {
            width: 100%;
            height: 60px;

            img {
                float: left;
                width: 130px;
                height: 46px;
            }
        }

        .login-feature {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 302px;
            margin: 0 auto 24px;

            .login-feature-right {
                font-size: 12px;

            }
        }

        .loginInput {
            width: 302px;
            margin: 20px auto 0;
            height: 40px;
            border-radius: 6px;

        }

        .logingbtn {
            .loginBtn {
                width: 316px;
                color: #fff;
                height: 40px;
                background: rgba(56, 184, 238, 1);
                border-radius: 26px;
            }

            .codeLogin {
                color: #333333;
                font-size: 12px;
                text-align: center;
                padding: 10px 0;
                margin: 10px 0;
            }

            .developerNum {
                text-align: right;
                font-size: 12px;
                color: #999999;
                padding-top: 45px;
            }
        }
    }


</style>
