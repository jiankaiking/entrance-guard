<template>
    <div class="menu">
        <!--        <div class="banner-left">-->
        <!--            <img src="../assets/images/logowhite.png" alt="运营中台">-->
        <!--        </div>-->
        <menutree :menuList="menuList"></menutree>
    </div>
</template>

<script>
    import httpRequest from "../api/api";
    import menutree from '@/components/Sidebar'

    export default {

        data() {
            return {
                uniquevalue: true,
                menuList: [],
                path: '',
            };
        },
        mounted(){
            httpRequest("/managecenter/index/getMenuTreeByUser", "GET")
                .then(res=>{
                    if(res.success){
                        res.data.filter((item,index)=>{
                            if(item.menuUrl == null){
                                item.menuUrl = index.toString()
                            }
                        })
                        this.menuList = JSON.parse(JSON.stringify(res.data))
                    }
                })
        },
        methods: {

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
