<template>
  <div class="loginMain" style="background-size: cover">
    <div class="main-logo">
<!--      <img src="../assets/images/loginlogo.png" alt="">-->
    </div>
    <div class="login-box">
      <h2 class="login-title">管理员登录</h2>
      <div class="loginCneter">
        <div class="login-logo">
<!--          <img src="../assets/images/loginlogo.png" alt="">-->
        </div>
        <!-- 扫码登录 -->
        <div class="sweep-login">
          <p>{{ !sweepLogin?'扫码登录':'账号登录' }}</p>
          <div class="post-u" />
          <img class="checkimg" :src="sweepLogin?'http://qiniutest.lywlsz.com.cn/2020_07_28_13_52_41_870.jpg':'http://qiniutest.lywlsz.com.cn/2020_07_28_11_47_05_868.png'" alt="" @click="checkLogin">
        </div>
        <div v-show="sweepLogin" class="sweep-box">
          <p>请打开手机app扫一扫登录</p>
          <div class="code-vue">
            <div v-if="codeValue === ''" class="post-code-vue">
              <p>二维码已失效</p>
              <el-button @click="applyRequest">重新申请</el-button>
            </div>
            <qrcode-vue :value="codeValue" :size="200" level="H" />
          </div>

        </div>
        <!-- 扫码登录end -->
        <el-form
          v-show="!sweepLogin"
          ref="loginForm"
          label-width="0"
          :model="userInfor"
          :rules="rules"
          style="padding-top: 20px"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="userInfor.userName"
              placeholder="请输入账号"
              clearable
              @keyup.enter.native="search('loginForm')"
            >
              <i slot="prefix" class="el-icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="userInfor.password"
              placeholder="请输入密码"
              type="password"
              clearable
              @keyup.enter.native="search('loginForm')"
            >
              <i slot="prefix" class="el-icon-lock" />
            </el-input>
          </el-form-item>
          <el-form-item prop="validateCode">
            <el-input
              v-model="userInfor.validateCode"
              placeholder="请输入验证码"
              @keyup.enter.native="search('loginForm')"
            >
              <i slot="prefix" class="el-icon-lock" />
              <template slot="suffix">
                <div class="login-code"><img :src="codeImg" alt="" @click="getCode"></div>
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
          <div v-show="!sweepLogin" class="btnLogin">
            <el-button class="loginBtn" @click="onSubmit('loginForm')">登录</el-button>
          </div>
          <p class="developerNum">开发商加版本号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import qrcodeVue from 'qrcode-vue'
import httpRequest from '../api/api'

import axios from 'axios'

export default {
  name: 'Login',
  components: {
    qrcodeVue
  },
  data() {
    return {

      rules: { // 用户名密码验证
        userName: [{ required: true, message: '账号不可为空', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不可为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
        validateCode: [{ required: true, message: '验证码不可为空', trigger: 'blur' }]
      },
      saveAccount: true,
      codeImg: '',
      sweepLogin: false, // 扫码登录切换
      userInfor: { // 用户名密码，验证码
        userName: '', // 用户名
        password: '', // 密码
        loginClient: 'PC',
        businessSystemID: 1,
        loginSncode: 'dhaskdj132132',
        validateCode: '' // 验证码
      },
      sweepLoginInfo: {
        uuid: '',
        loginClient: 'PC'
      },
      codeValue: '',
      timeName: null

    }
  },
  mounted() {
    const that = this
    const token = this.$route.query.token
    if (token) {
      sessionStorage.setItem('token', token)
      axios.get('/api/managecenter/index/getUserInfo', { headers: { 'Authorization': token }})
        .then(res => {
          if (res.data.success) {
            const userInfo = res.data.data
            window.sessionStorage.setItem('user', JSON.stringify(userInfo))
            that.auth_success({ token, userInfo })
            this.GET_ORGAN()
            this.GET_STYEMITEM()
            this.$router.push('/')
          }
        })
    } else {
      this.getCode()
    }
  },
  methods: {

    search(fromName) {
      this.onSubmit(fromName)
    },
    ...mapMutations(['auth_success']),
    ...mapActions(['GET_ORGAN', 'GET_STYEMITEM']),
    // 登录按钮  表单验证，验证成功 action提交
    onSubmit(fromName) {
      this.$refs[fromName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('Login', this.userInfor)
            .then(res => {
              if (res.success) {
                this.GET_ORGAN()
                this.GET_STYEMITEM()
                this.$router.push('/')
                // this.$route.query.redirect && _that.$router.push(this.$route.query.redirect)
              }
            })
        } else {
          return false
        }
      })
    },

    getCode() {
      this.codeImg = '/api/managecenter/login/getValidateCode?' + Math.random()
    },
    getCheck() {
      this.codeValue = `managecenter/login/scanLogin?uuid=${this.sweepLoginInfo.uuid}`
    },
    loopRequset() {
      httpRequest('managecenter/login/checkScanLoginPool', 'POST', this.sweepLoginInfo)
        .then(res => {
          // console.log(res)
          if (res.code === 200) {
            const token = res.data.token
            const userInfo = res.data.userInfo
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('user', JSON.stringify(userInfo))
            this.auth_success({ token, userInfo })
            this.$router.push('/')
          } else if (res.code === 402) {
            this.codeValue = ''
            clearTimeout(this.timeName)
          } else if (res.code === 407) {
            this.timeName = setTimeout(this.loopRequset, 1000)
          }
        })
        .catch(() => {
          this.codeValue = ''
          clearTimeout(this.timeName)
        })
    },
    // 申请
    applyRequest() {
      httpRequest('managecenter/login/getScanLoginUuid', 'get')
        .then(res => {
          if (res.success) {
            this.sweepLoginInfo.uuid = res.data
            this.getCheck()
            this.loopRequset()
          }
        })
    },
    // 切换登录方式
    checkLogin() {
      clearTimeout(this.timeName)
      if (!this.sweepLogin) {
        this.applyRequest()
      }
      this.sweepLogin = !this.sweepLogin
    },
    // 忘记密码
    fogetPassword() {
      this.$router.push('/findpassword')
    }
  }
}
</script>

<style lang="scss" scoped>

    .code-vue {
        padding: 15px 0;
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;

    }

    .post-code-vue {
        position: absolute;
        width: 200px;
        height: 200px;
        z-index: 999;
        background: rgba(0, 0, 0, .5);
        margin-left: -50%;
        left: 50%;
    }

    .post-code-vue p {
        color: #fff;
        margin: 30px 0;
    }

    .el-icon-lock, .el-icon-user {
        font-size: 22px;
        margin-top: 8px;
        color: #979797;
    }

    .checkimg {
        margin-left: 20px;
        position: relative;
    }

    .post-u {
        position: absolute;
        background: #ffffff;
        z-index: 3;
        width: 90px;
        height: 50px;
        left: 15px;
        top: 14px;
        transform: rotateZ(45deg);
        bottom: -10px;
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
                cursor: pointer;
            }

            p {
                font-size: 14px;
                position: relative;
                z-index: 99;
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
        height: 100vh;

        background: url("../assets/images/loginbgc.png") no-repeat center;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;

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
        min-width: 500px;
        position: absolute;
        right: 582px;
        padding: 0 35px 15px 35px;
        top: 50%;
        margin-top: -300px;
        border-radius: 10px;

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
                cursor: pointer;

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
