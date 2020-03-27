<template>
    <div class="home">
        <!--        <router-view/>-->
        <el-container>
            <el-aside width="225px" class="aside">
                <GlobalLayout></GlobalLayout>
            </el-aside>
            <el-main class="clear">
                <GlobalHeader></GlobalHeader>
                <div class="centerCont">
                    <GlobalHistorynav v-if="!this.$route.meta.historyFlag"></GlobalHistorynav>
                    <transition :name="direction">　　　　　　
                        <router-view class="child-view"></router-view>
                        　
                    </transition>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import GlobalHeader from "../components/GlobalHeader";
    import GlobalHistorynav from "../components/GlobalHistorynav";
    import GlobalLayout from "../components/GlobalLayout";

    export default {
        name: 'Home',
        data() {
            return {
                direction: "slide-right"
            }
        },
        components: {
            GlobalHeader,
            GlobalHistorynav,
            GlobalLayout
        },
    };
</script>
<style lang="scss">

    .child-view {
        width: calc(100% - 300px);
        position: absolute;
        height: 100%;
        transition: all 1s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    .el-main {
        padding: 0;
    }

    .centerCont {
        padding: 40px;
        box-sizing: border-box;
        height: auto;
    }

    .aside {
        background: #fff;
        height: 100%;
        box-shadow: 0px 2px 10px 8px rgba(234, 234, 234, 0.5);
    }
</style>
