<template>
    <el-container>
        <el-header>
            <GlobalHeader></GlobalHeader>
        </el-header>
        <el-container>
            <el-aside width="200px;" style="min-height:968px">
                <GlobalLayout></GlobalLayout>
            </el-aside>
            <el-main style="padding:40px; box-sizing: border-box; overflow:auto;">
                <GlobalHistorynav v-if="!$route.meta.historyFlag"></GlobalHistorynav>
                <router-view/>
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

    .centerCont {
        padding: 40px;
        box-sizing: border-box;
        height: auto;
    }
    .el-aside{
        box-shadow:0 2px 10px 8px hsla(0,0%,91.8%,.5); background: #ffffff;
    }

    .aside {
        background: #fff;
        height: 100%;
        box-shadow: 0px 2px 10px 8px rgba(234, 234, 234, 0.5);
    }
</style>
