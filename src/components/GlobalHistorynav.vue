<template>
  <div class="histonav">
    <el-scrollbar ref="scrollbar" :vertical="false" view-class="width:100%" view-style="" tag="section">
      <div style="display: flex; flex-wrap: nowrap">
        <div
          v-for="(item,index) in this.$store.state.menuTagArr"
          ref="box"
          :key="index"
          class="hist-menu"
          :class="{'active':$route.path === item.path}"
          @contextmenu.prevent="show($event,index)"
          @click="changePath(item.path)"
        >
          <span>{{ item.title }}</span>
          <i class="el-icon-close close" @click="closeTag(index)" />
        </div>
      </div>
    </el-scrollbar>
    <p />
    <div v-show="showMenu" class="menucont" :style="{left:left,top:top}">
      <ul>
        <li @click.stop="undatePage()"><i class="el-icon-refresh-left" />刷新</li>
        <li @click.stop="closeRight()"><i class="el-icon-right" />关闭右边</li>
        <li @click.stop="closeLeft()"><i class="el-icon-back" />关闭左边</li>
        <li @click.stop="closeAnother()"><i class="el-icon-close" />关闭其他</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'GlobalHistorynav',
  data() {
    return {
      historyNav: [],
      showMenu: false,
      navIndex: '',
      left: '',
      top: ''
    }
  },
  mounted() {
    // console.log(this.$refs.scrollbar)
    document.addEventListener('click', (e) => {
      if (e.target.className !== 'closeAll') {
        this.showMenu = false
      }
    })
  },
  methods: {
    ...mapMutations(['CLOSE_MENU']),

    // 刷新
    undatePage() {
      window.location.reload()
    },
    // 关闭右边
    closeRight() {
      this.CLOSE_MENU({ index: this.navIndex, type: 'right' })
      this.showMenu = false
    },
    // 关闭左边
    closeLeft() {
      this.CLOSE_MENU({ index: this.navIndex, type: 'left' })
      this.showMenu = false
    },
    // 关闭其他
    closeAnother() {
      this.$router.push(this.menuTagArr[this.navIndex].path)
      this.CLOSE_MENU({ index: this.navIndex, type: 'other' })
      this.showMenu = false
    },

    changePath(id) {
      if (this.$route.path !== id) {
        this.$router.push({ path: id })
      }
    },
    closeTag(index) {
      this.$store.state.menuTagArr.splice(index, 1)
      sessionStorage.setItem('menuTagArr', JSON.stringify(this.$store.state.menuTagArr))
    },
    show(e, index) {
      this.navIndex = index
      this.left = e.clientX + 'px'
      this.showMenu = true
      this.top = e.clientY + 'px'
    },
    addTagView() {
      this.$store.dispatch('addTagView', { path: this.$route.path, title: this.$route.meta.title })
    }
  },
  watch: {
    $route() {
      this.addTagView()
    }
  },
  computed: {
    ...mapState(['menuTagArr'])
  }
}
</script>
<style>
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
        white-space: nowrap;
    }
</style>
<style scoped>
    .histonav .clear {
        height: 50px;
        overflow: hidden;
    }

    .histonav .hist-menu {
        margin-bottom: 20px;
    }

    .histonav .hist-menu {
        float: left;
        /* width: 138px; */
        padding: 0 27px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 25px;
        line-height: 36px;
        height: 36px;
        background: white;
        box-shadow: 0 1px 6px 4px #f2f2f2;
        font-size: 14px;
        color: #4589A5;
        border-radius: 18px;
        position: relative;
    }

    .histonav .hist-menu.active {
        background: #38B8EE;
        color: #ffffff;
    }

    .histonav .hist-menu.active i {
        color: #ffffff;
    }

    .histonav .clear li .close {
        position: relative;
        right: -10px;
        bottom: 0;
    }

    .histonav .hist-menu:hover {
        cursor: pointer;
        background: #38B8EE;
        color: #ffffff;
    }

    .histonav .clear > li:hover i {
        color: #ffffff;
    }

    .histonav .menucont {
        box-shadow: 2px 2px 10px #aaa !important;
        background: #fff;
        border: 1px solid #ccc;
        position: fixed;
        z-index: 220;
    }

    .histonav .menucont li {
        padding: 0 18px;
        height: 50px;
        line-height: 50px;
        color: rgba(0, 0, 0, 0.65);
        cursor: default;
    }

    .histonav .menucont li i {
        color: rgba(0, 0, 0, 0.65);
        margin-right: 5px;
        font-size: 16px;
    }

    .histonav .menucont li:hover {
        cursor: pointer;
        color: #409EFF;
    }

    .histonav .menucont li:hover i {
        color: #409EFF;
    }

    .histonav p {
        color: #666666;
        font-size: 14px;
        padding: 20px 0;
    }
</style>
