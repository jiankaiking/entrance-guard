<template>
  <div class="indexPage">
    <div class="dataStatic" />
    <div v-if="user.isShowCommonFunc == 1" class="common-use" @drop="drop" @dragover="dragover">
      <div class="common-use-title"><span>常用功能</span></div>
      <i v-if="useData.length != 0" class="el-icon-arrow-left" @click="leftRowclick" />
      <i v-if="useData.length != 0" class="el-icon-arrow-right" @click="rightRowclick" />
      <div ref="parentCommonly" class="useContenner">
        <vuedraggable
          ref="commonly"
          v-model="useData"
          :options="{animation:300}"
          class="wrapper clear"
          :style="{width:getWidth + 'px',marginLeft:marginLeft + 'px'}"
          @change="changeAddress"
          @end="end"
        >
          <transition-group>
            <div v-for="(item,index) in useData" :key="index" class="item" @click="router(item.menuUrl)">
              <img :src="item.menuIcon?item.menuIcon:image" alt="">
              <p>{{ item.menuName }}</p>
            </div>
          </transition-group>
        </vuedraggable>
      </div>
    </div>
    <div v-if="user.isShowHotNews == 1" class="common-use">
      <div class="common-use-title">
        <span>热门信息</span><span class="more">更多....</span>
      </div>
      <div class="hotMessge">
        <ul class="clear">
          <li v-for="(item,index) in messgesData" :key="index">{{ item.title }}</li>
        </ul>
      </div>
    </div>
    <div v-if="user.isShowQrcode == 1" class="common-use">
      <div class="common-use-title">
        <span>常用二维码</span>
      </div>
      <div class="webapp">
        <ul class="clear">
          <li v-for="(item,index) in webappData" :key="index">
            <img :src="item.qrcodeUrl" :alt="item.qrcodeName">
            <span>{{ item.qrcodeName }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import img from '@/assets/images/active.jpeg'
import httpRequest from '../api/api'
import { mapActions, mapState } from 'vuex'
import vuedraggable from 'vuedraggable'

export default {
  name: 'IndexPage',
  components: {
    vuedraggable
  },
  data() {
    return {
      dragging: null,
      useData: [],
      messgesData: [{ title: '空腹可以吃饭吗' }, { title: '哪个地方得女人最好看' }],
      webappData: [],
      marginLeft: 0,
      leftFlag: true,
      image: img,
      firstY: '',
      firstDrag: null,
      endDrag: null,
      endY: '',
      remove: false
    }
  },
  computed: {
    ...mapState(['user']),
    getWidth(useData) {
      return 220 * this.useData.length
    }
  },
  mounted() {
    this.getIndexInfo()
    window.document.body.style.backgroundColor = '#ffffff'
  },
  methods: {
    router(event) {
      this.$router.push({ path: event })
    },
    // 拖拽结束
    end(evt) {
      if (!this.remove) {
        var newArr = []
        for (var i = 0; i < this.useData.length; i++) {
          if (i !== evt.newIndex) {
            newArr.push(this.useData[i].menuId)
          }
        }
        var str = newArr.join(',')
        this.commonlyUsed(str)
      }
    },
    // 接收从菜单移动过来的参数
    drop(event) {
      this.remove = true
      var menuId = event.dataTransfer.getData('menuId')
      if (menuId) {
        var newArr = [menuId]
        for (var i = 0; i < this.useData.length; i++) {
          if (menuId !== this.useData[i].menuId) {
            newArr.push(this.useData[i].menuId)
          }
        }
        var str = newArr.join(',')
        this.commonlyUsed(str)
      }
    },
    // 常用调整请求
    commonlyUsed(str) {
      httpRequest('/managecenter/index/updateCommonFunctions', 'post', { menuIds: str })
        .then(res => {
          if (res.success) {
            httpRequest('/managecenter/index/getCommonFunctions', 'GET')
              .then(res => {
                if (res.success) {
                  this.useData = res.data
                  this.remove = false
                }
              })
          }
        })
    },
    dragover(event) {
      event.preventDefault()
    },
    ...mapActions(['GET_STYEMITEM']),
    ...mapActions(['GET_ORGAN']),
    // 常用发生变化移动的
    changeAddress(evt) {
      var newArr = []
      for (var i = 0; i < this.useData.length; i++) {
        newArr.push(this.useData[i].menuId)
      }
      var str = newArr.join(',')
      this.commonlyUsed(str)
    },
    getIndexInfo() {
      httpRequest('/managecenter/index/getUserInfo', 'GET')
        .then(res => {
          return httpRequest('/managecenter/index/getCommonQrcode', 'GET')
        })
        .then(res => {
          if (res.success) {
            this.webappData = res.data
          }
          return httpRequest('/managecenter/index/getCommonFunctions', 'GET')
        })
        .then(res => {
          if (res.success) {
            this.useData = res.data
          }
          return httpRequest('/managecenter/index/getHotNews', 'GET')
        })
        .then(res => {
        })
    },
    rightRowclick() {
      var parent = this.$refs.parentCommonly.clientWidth
      var left = Math.abs(this.marginLeft)
      if (parent + left < this.$refs.commonly.$el.clientWidth - 220) {
        this.marginLeft = this.marginLeft - 220
        this.leftFlag = true
      } else {
        this.marginLeft = 0
        this.leftFlag = false
      }
    },
    leftRowclick() {
      var left = this.marginLeft
      if (left < 0) {
        this.marginLeft = this.marginLeft + 220
      }
    }

  }
}
</script>

<style lang="scss" scoped>
    .common-use {
        width: 100%;
        background-color: #ffffff;
        height: 200px !important;
        overflow: hidden;
        position: relative;
    }

    .indexPage {
        overflow: hidden;

        .dataStatic {
            margin-bottom: 30px;
            width: 100%;
            background-color: #F5F5F5;
            height: 445px;
        }

        .common-use {
            .common-use-title {
                color: #333333;
                border-bottom: 1px solid #DDDDDD;
                font-size: 20px;
                display: flex;
                justify-content: space-between;
                width: 100%;

                span {
                    border-bottom: #38B8EE 2px solid;

                    &:nth-child(2) {
                        cursor: pointer;
                        border: none;
                        font-size: 14px;

                        &:hover {
                            color: #409EFF;
                        }
                    }
                }
            }

            .webapp, .hotMessge {
                padding: 30px 0 30px 10px;
            }

        }
    }

    .el-icon-arrow-right {
        position: absolute;
        right: -15px;
        font-size: 45px;
        color: #CFCFCF;
        top: 60%;
        margin-top: -23px;
        background: #fff;
    }

    .el-icon-arrow-left {
        position: absolute;
        left: 0px;
        font-size: 45px;
        color: #CFCFCF;
        top: 60%;
        margin-top: -23px;
    }

    .useContenner {
        width: 1500px;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        margin: 30px 50px 30px 60px;
        padding: 10px 10px;

        .wrapper {
            transition: all .5s;
            display: flex;
            justify-content: flex-start;

            width: 100%;
        }

        .item {
            vertical-align: top;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            width: 168px;
            height: 106px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 6px 4px rgba(231, 248, 255, 1);
            border-radius: 8px;
            padding: 13px 0;
            box-sizing: border-box;
            margin-right: 45px;
            margin-bottom: 30px;

            img {
                width: 50px;
                height: 50px;
            }
        }
    }

    .hotMessge {
        li {
            color: #333333;
            font-size: 14px;
            position: relative;
            padding-left: 14px;
            height: 20px;
            line-height: 20px;

            &:before {
                position: absolute;
                content: '';
                width: 4px;
                height: 4px;
                background: #409EFF;
                left: 0;
                top: 50%;
                margin-top: -2px;
            }

            &:not(:first-child) {
                margin-top: 15px;
            }
        }
    }

    .webapp {
        li {
            float: left;
            text-align: center;
            margin-right: 100px;

            img {
                display: block;
                width: 74px;
                height: 74px;

            }

            span {
                color: #333333;
                font-size: 14px;
            }
        }
    }

</style>
