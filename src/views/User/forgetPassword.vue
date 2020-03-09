<template>
    <div class="forget-main">
        <div class="forget-top">
            <img src="../../assets/images/loginlogo.png" alt="">
            <span>找回密码</span>
        </div>

        <!-- 第一步 -->
        <el-form class="forget-from" ref="form" :model="findData" :rules="rules" v-if="status == 0">
            <el-form-item prop="phoneNum">
                <el-input placeholder="请输入账号/手机号" v-model="findData.phoneNum"></el-input>
            </el-form-item>
            <el-form-item prop="smsValidateCode">
                <el-input placeholder="请输入验证码" v-model="findData.smsValidateCode">
                    <template slot="suffix">
                        <div class="login-code"><img @click="getCode" :src="codeImg" alt=""></div>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input placeholder="请输入账号/手机号" v-model="findData.code">
                    <template slot="append">
                        <span class="code" @click="getPhoneCode">{{messageCont}}</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="next-Button" @click="nextStep('form')">下一步</el-button>
            </el-form-item>
        </el-form>

        <!-- 第二步 -->
        <el-form class="forget-from" ref="resetForm" v-else-if="status == 1" :model="passwordFrom" :rules="rules">
            <p class="title">设置新密码</p>
            <el-form-item style="margin-bottom: 0;padding-bottom: 0;" prop="password">
                    <el-input placeholder="请输入密码 " v-model="passwordFrom.password">
                        <i slot="suffix" class="el-icon-view"></i>
                    </el-input>
            </el-form-item>
            <p class="text"><i class="el-icon-warning-outline"></i>建议使用字母、数字和符号两种以上的组合，8-20个字符</p>
            <p class="title">再次输入新密码</p>
                <el-form-item prop="password" prop="passwordTrue">
                    <el-input placeholder="请输入密码" v-model="passwordFrom.passwordTrue">
                        <i slot="suffix" class="el-icon-view"></i>
                    </el-input>
                </el-form-item>
            <el-form-item>
                <el-button class="next-Button" @click="passwordSubmit('resetForm')">提交</el-button>
            </el-form-item>
        </el-form>

        <div class="forget-from isOk" v-else>
            <div>
                <i class="el-icon-circle-check"></i>
            </div>
            <p>登录密码更新成功</p>
            <el-button class="next-Button" @click="goLogin">重新登录</el-button>
        </div>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import validate from "../../mixins/validate";
    import BASE_URL from '../../api/config'

    export default {
        name: "forgetPassword",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordFrom.password) {
                    console.log(value)
                    callback(new Error('密码两次输入不一致!'));
                } else {
                    callback();
                }
            };
            return {
                status: 0,
                findData: {
                    smsValidateCode: '',
                    phoneNum: '',
                    code: '',
                },
                passwordFrom:{
                    password:'',
                    passwordTrue:''
                },
                rules: {
                    smsValidateCode: validate.noEmpty,
                    phoneNum: validate.noEmpty,
                    code: validate.noEmpty,
                    password:validate.noEmpty,
                    passwordTrue: [
                        { validator: validatePass, trigger: 'blur', required: true }
                    ],
                },
                btnDisabled: false,
                messageCont: "获取短信验证码",
                codeImg: BASE_URL + '/login/getSmsValidateCode',
            }
        },
        methods: {
            //刷新验证码
            getCode() {
                this.codeImg = BASE_URL + '/login/getValidateCode?' + Math.random()
            },
            //倒计时
            countDown(num) {
                let _this = this;
                let _wait = num;
                if (num == 0) {
                    this.btnDisabled = false;
                    this.messageCont = "获取短信验证码"
                    num = _wait;
                } else {
                    this.btnDisabled = true;
                    this.messageCont = num + "S"
                    num--;
                    setTimeout(function () {
                        _this.countDown(num);
                    }, 1000);
                }
            },
            //获取手机验证码

            getPhoneCode() {
                if (this.btnDisabled) {
                    return;
                }
                httpRequest("/login/forgetPassWordByValiCode", "POST", {
                    phoneNum: this.findData.phoneNum,
                    smsValidateCode: this.findData.smsValidateCode
                })
                    .then(res => {
                        if (res.success) {
                            this.countDown(60);
                        }
                    })
            },
            //验证手机号验证码
            validatePhone() {
                httpRequest("/login/verifySmsCode", "POST", {
                    phoneNum: this.findData.phoneNum,
                    code: this.findData.code
                })
                    .then(res => {
                        if (res.success) {
                            this.status = 1
                        }
                    })
            },
            //下一步
            nextStep(fromName) {
                let _that = this;
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        _that.validatePhone()
                    } else {
                        return false;
                    }
                });
            },
            //密码申请
            rePassword(){
                let data = {
                    phoneNum:this.findData.phoneNum,
                    password:this.passwordFrom.password,
                    code:this.findData.code,
                }
                httpRequest("/login/updatePassWordByPhone","POST",data)
                    .then(res=>{
                        this.status = 2
                    })
            },
            //提交密码
            passwordSubmit(fromName) {
                let _that = this;
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        _that.rePassword()
                    } else {
                        return false;
                    }
                });

            },
            goLogin() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-code {
        cursor: pointer;
        width: 90px;
        height: 30px;
        margin: 5px 0;

        img {

            width: 90px;
            height: 30px;
        }
    }

    .isOk {
        text-align: center;

        p {
            margin: 30px 0;
            font-size: 16px;
            color: #333333;
        }
    }

    .el-icon-circle-check {
        font-size: 82px;
        color: #67C23B;
    }

    .forget-main {
        font-family: MicrosoftYaHei;
        height: 935px;
        background-color: #ffffff;

        .forget-top {
            height: 137px;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 0 219px;
            box-sizing: border-box;
            box-shadow: 0px 2px 8px 4px rgba(242, 242, 242, 1);

            img {
                margin-right: 40px;
            }

            span {
                font-size: 24px;
                color: #000000;
            }
        }

        .forget-from {
            width: 460px;
            margin: 131px auto 0;

            .title {
                color: #38B8EE;
                font-size: 20px;
                margin-bottom: 25px;
            }

            .text {
                margin-bottom: 10px;
                color: #999999;
                font-size: 12px;
            }

            span {
                box-sizing: border-box;
                padding: 9px 20px;
                margin-left: 10px;
                color: #38B8EE;
                border: 1px solid #38B8EE;
                background: #ffffff;
            }

            .next-Button {
                background: #38B8EE;
                width: 100%;
                color: #ffffff;
            }

            .el-form-item {
                margin-bottom: 25px;
                height: 52px;
            }
        }

    }

    .el-icon-view {
        font-size: 16px;
        color: #999999;
        padding-right: 10px;
    }
</style>
