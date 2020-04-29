<template>
    <el-container>
<!--        <router-view></router-view>-->
        <el-header>
            <GlobalHeader></GlobalHeader>
        </el-header>
        <el-container>
            <el-aside width="200px;" style="min-height:968px">
                <GlobalLayout></GlobalLayout>
            </el-aside>
            <el-main style="padding:40px; box-sizing: border-box; overflow:auto;" class="clear">
                <GlobalHistorynav v-if="!$route.meta.historyFlag"></GlobalHistorynav>
                <router-view></router-view>　
            </el-main>
        </el-container>
    </el-container>
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
    .el-main {
        padding: 0;
        overflow: visible;
    }

    .child-view {
        width: calc(100% - 306px);
        position: absolute;

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


    .centerCont {
        padding: 40px;
        box-sizing: border-box;
        height: auto;
    }

    .el-aside {
        box-shadow: 0 2px 10px 8px hsla(0, 0%, 91.8%, .5);
        background: #ffffff;
    }

    .aside {
        background: #fff;
        height: 100%;
        box-shadow: 0px 2px 10px 8px rgba(234, 234, 234, 0.5);
    }
</style>
