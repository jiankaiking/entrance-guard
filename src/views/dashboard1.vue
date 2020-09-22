<template>
  <div class="home">
    <el-container>
      <el-aside width="225px" class="aside">
        <GlobalLayout />
      </el-aside>
      <el-main class="clear backColor">
        <GlobalHeader />
        <div class="centerCont">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GlobalHeader from '../components/GlobalHeader'
import GlobalHistorynav from '../components/GlobalHistorynav'
import GlobalLayout from '../components/GlobalLayout'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    GlobalHeader,
    GlobalHistorynav,
    GlobalLayout
  },
  computed: {
    ...mapState(['historyHidden'])
  }
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>

    .el-main{
        padding: 0; overflow: visible;
    }
    .backColor{
        background: #ffffff;
    }
    .centerCont{
        padding: 40px; box-sizing: border-box;
    }

</style>
