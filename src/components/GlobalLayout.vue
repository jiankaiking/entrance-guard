<template>
    <div class="menu">
        <menutree :menuList="menuList"></menutree>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'
    import menutree from '@/components/Sidebar'

    export default {

        data() {
            return {
                uniquevalue: true,
                path: '',
            };
        },
        mounted(){
            this.menuChange()
        },
        methods: {
            ...mapActions(["menuChange"]),
        },
        computed:{
            ...mapState({menuList:state=>state.permission.menuList})
        },
        components: {
            menutree
        },
    }
    ;
</script>

<style>
    .banner-left {
        text-align: center;
        font-family: PingFangSC-Semibold;
        width: 225px;
        height: 70px;
        background: #38B8EE;


    }

    .banner-left img {
        margin: 15px auto;
        width: 116px;
        height: 40px;
    }

    .menu {
        font-size: 12px;
        overflow: hidden
    }

    .menuItewm {
        width: 200px;
        height: 50px;
        float: left
    }

    .sublabel li {
        background: red;
        padding: 20px
    }

    .bigmenu {

        color: #fff;
        padding: 20px
    }
</style>
