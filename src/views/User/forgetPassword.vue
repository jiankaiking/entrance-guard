<template>
    <div class="forget-main">
        <div class="forget-top">
            <img src="../../assets/images/loginlogo.png" alt="">
            <span>找回密码</span>
        </div>

        <!-- 第一步 -->
        <el-form class="forget-from" v-if="status == 0">
            <el-form-item>
                <el-input placeholder="请输入账号/手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入账号/手机号">
                    <template slot="append">
                        <span class="code" @click="getCode">获取短信验证码</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="next-Button" @click="nextStep">下一步</el-button>
            </el-form-item>
        </el-form>

        <!-- 第二步 -->
        <el-form class="forget-from"  v-else-if="status == 1">
            <p class="title">设置新密码</p>
            <el-form-item style="margin-bottom: 0;padding-bottom: 0;">
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码">
                        <i slot="suffix" class="el-icon-view"></i>
                    </el-input>
                </el-form-item>
            </el-form-item>
            <p class="text"><i class="el-icon-warning-outline"></i>建议使用字母、数字和符号两种以上的组合，8-20个字符</p>
            <p class="title">再次输入新密码</p>
            <el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码">
                        <i slot="suffix" class="el-icon-view"></i>
                    </el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button class="next-Button" @click="passwordSubmit">提交</el-button>
            </el-form-item>
        </el-form>

        <div class="forget-from isOk"  v-else>
            <div>
                <i class="el-icon-circle-check"></i>
            </div>
            <p>登录密码更新成功</p>
            <el-button class="next-Button" @click="goLogin">重新登录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "forgetPassword",
        data() {
            return {
                status:0,
            }
        },
        methods: {
            nextStep(){
                this.status = 1
            },
            passwordSubmit(){
                this.status = 2
            },
            getCode() {
                console.log(123)
            },
            goLogin(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
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
