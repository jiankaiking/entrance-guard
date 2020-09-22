<template>
  <div class="menutree">
    <div v-for="menu in data " :key="menu.index">
      <el-submenu
        v-if="menu.children"
        :index="menu.index"
        :class="menu_index == menu.index ? 'menu_item' : 'menu_item menu_hidden'"
        @click.native="selected_menu(menu.index, menu.name, 1)"
      >
        <template slot="title">
          <img :src="menu.img">{{ menu.name }}
        </template>
        <menutree :data="menu.children" />
      </el-submenu>
      <el-menu-item
        v-else-if="menu.index*1>0"
        :index="menu.index"
        class="menu_tree"
        :class="menu_index == menu.index ? 'menu_item' : 'menu_item menu_hidden'"
        @click.native.stop="selected_menu_child(menu.index, menu.name, menu.index*1>0?0:1)"
      >
        <template slot="title">
          <img :src="menu.img">{{ menu.name }}
        </template>
      </el-menu-item>
      <template v-else>
        <el-menu-item
          :index="menu.index"
          :class="cont == menu.index ? 'menu_child_item' : 'menu_child_item menu_child_hidden'"
          @click.native="selected_menu_child(menu.index,menu.path, menu.name, menu.index*1>0?0:1)"
        >
          {{ menu.name }}
        </el-menu-item>
      </template>
    </div>
  </div>
</template>
<script>
import menutree from './menutree'
import { mapState } from 'vuex'

export default {
  name: 'Menutree',
  components: {
    menutree: menutree
  },
  props: ['data'],
  data() {
    return {
    }
  },

  computed: {
    ...mapState(['cont', 'menu_index'])
  },
  methods: {
    selected_menu(index, name, cur_state) {
      this.$store.state.menu_index = index
    },
    selected_menu_child(index, path, name, cur_state) {
      if (cur_state === 0) {
        this.$store.state.menu_index = index
        this.$store.state.cont = 0
      } else {
        this.$store.state.cont = index
      }

      this.$router.push(path)
    }
  }
}
</script>

<style>

    a {
        text-decoration: none;
    }

    .menu_tree {
        text-indent: 60px;
        text-align: left;
    }

    .menu_child_item {
        text-indent: 60px;
        text-align: left;
    }

    .menu_item {
        color: #38B8EE !important;
        position: relative;
        font-size: 14px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
    .menu_item .el-submenu__title {
        background: #F5FCFF !important;
        color: #38B8EE;
        position: relative;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    .menu_item img {
        position: absolute;
        left: 41px;
        width: 18px;
        height: 19px;
        top: 50%;
        transform: translateY(-50%);
    }

    .menu_item .el-submenu__title img {
        position: absolute;
        left: 41px;
        width: 18px;
        height: 19px;
        top: 50%;
        transform: translateY(-50%);
    }

    .menu_hidden {
        color: #666666 !important;
    }
    .menu_hidden .el-submenu__title {
        color: #666666 !important;
        background: #fff !important;
    }

    .menu_child_item {
        background: #fff !important;
        color: #38B8EE !important;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    .menu_child_hidden {
        background: #fff;
        color: #666666 !important;
    }

    .el-submenu__title {
        text-indent: 60px;
        display: inline-block;
        width: 100%;
        text-align: left;
        position: relative;
    }
    .el-submenu__title .el-submenu__icon-arrow {
        position: absolute;
        right: 50px;
        transform: translateX(14px);
        transform-origin: right;
    }
</style>

