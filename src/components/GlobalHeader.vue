<template>
  <div class="banner clear">
    <div class="banner-right clear">
      <div class="help">
        <img src="../assets/images/help.png" alt="">
        <span>帮助</span>
      </div>
      <div class="banner-userinfo">
        <el-dropdown @command="handleCommand">
          <div class="userMsg">
            <img class="userVia" :src="user.userIcon" alt="">
            <span class="el-dropdown-link">
              {{ user.userName }}
            </span>
            <i class="el-icon-arrow-down" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" @click.native="loginOut($route)">
              退出登录
            </el-dropdown-item>
            <el-dropdown-item command="logout" @click.native="myInfo">
              查看信息
            </el-dropdown-item>
            <el-dropdown-item command="logout" @click.native="changePassword">
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['LogOut']),
    loginOut(route) {
      this.LogOut(route).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 100)
      })
    },
    changePassword() {
      this.$router.push('/findpassword')
    },
    myInfo() {
      this.$router.push('/user')
    },
    handleCommand(command) {
    }
  }
}

</script>

<style lang="scss" scoped>

    .el-select .el-input.is-focus .el-input__inner {
        border: none;
    }

    .help {
        display: flex;
        align-items: center;
        color: #ffffff;
        line-height: 70px;
        height: 70px;
        margin-right: 60px;
    }

    .help span {
        padding: 0 20px;
    }

    .help img {
        width: 33px;
        height: 33px;
    }

    .el-select .el-input__inner {
        border: none;
        background: #ffffff;
    }

    .banner {
        //width: 100%;
        height: 70px;
        background: #38B8EE;
        box-sizing: border-box;
        padding-right: 45px;
    }

    .banner-left {
        float: left;
        text-align: center;
        font-family: PingFangSC-Semibold;
        width: 225px;
        margin: 0 auto;
    }

    .banner-left img {
        width: 150px;
        height: 50px;
        margin-top: 10px;
    }

    .banner-right {
        float: right;
        display: flex;
        min-width: 300px;
        align-items: center;
        height: 100%;
        position: relative;
    }

    .banner-right .changeColor {
        margin-top: 15px;
        margin-right: 25px;
        float: left;
        width: 100px;
    }

    .banner-right .banner-userinfo {
        float: right;
        cursor: pointer;
    }

    .userMsg {
        display: flex;
        align-items: center;
        height: 70px;
        color: #ffffff;
    }

    .userMsg .el-dropdown-link {
        margin: 0 25px;

    }

    .userMsg .el-icon-arrow-down {
        color: #CFCFCF;
    }

    .userMsg .userVia {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
    }

    .userMsg .el-icon--right {
        width: 15px;
    }

</style>
