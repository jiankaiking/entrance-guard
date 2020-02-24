<template>
    <div class="home">
        <el-container>
            <el-aside width="225px" class="aside">
                <GlobalLayout></GlobalLayout>
            </el-aside>
            <el-main class="clear">
                <GlobalHeader></GlobalHeader>
                <div class="centerCont">
                    <GlobalHistorynav  v-if="!this.$route.meta.historyFlag"></GlobalHistorynav>
                    <router-view/>
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
        components: {
            GlobalHeader,
            GlobalHistorynav,
            GlobalLayout
        },
    };
</script>
<style lang="scss">
    .el-main{
        padding: 0; overflow: visible;
    }
    .centerCont{
        padding: 40px; box-sizing: border-box; height: auto;
    }
    .aside{
        background: #fff; height: 100%;box-shadow:0px 2px 10px 8px rgba(234,234,234,0.5);
    }
</style>
