<template>
    <div class="agentContenner">
        <div class="tabsCard">
            <div class="tabsNav">
                <ul class="clear">
                    <li @click="agentcheck($event,0)" :class="{active:cli == 0}">
                        <router-link to="/entrepot/unshipped" tag="span">未发货</router-link>
                    </li>
                    <li @click="agentcheck($event,1)" :class="{active:cli == 1}">
                        <router-link to="/entrepot/outrecord" tag="span">出库记录</router-link>
                    </li>
                    <li @click="agentcheck($event,2)" :class="{active:cli == 2}">
                        <router-link to="/entrepot/getrecord" tag="span">入库记录</router-link>
                    </li>
                    <li @click="agentcheck($event,3)" :class="{active:cli == 3}">
                        <router-link to="/entrepot/repertory" tag="span">设备库存</router-link>
                    </li>
                </ul>
                <div class="line" :style="{left:left}"></div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import httpRequest from "../api/api";
    import BASE_URL from '../api/config'

    export default {
        name: "EntrepotHeader",
        data() {
            return {
                routerFlag: false,
                left: 0,
                pageType: '',  //新增，详情 类型判断
                cli: 0
            };
        },
        created() {

        },
        mounted() {

        },
        methods: {
            agentcheck(e, num) {
                if (num != this.cli) {
                    let widtha = e.target.getBoundingClientRect().width;
                    this.left = widtha * num + 100 * num + 'px'
                    this.cli = num;
                }
            }
        }
    }
</script>

<style scoped>


    .tabsCard {
        margin-bottom: 25px;
        background-color: #ffffff;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        padding: 0 68px;
        box-sizing: border-box;
        height: 60px;
        border-radius: 8px;
    }

    .tabsNav {
        position: relative;
    }

    .tabsNav li {
        float: left;
        line-height: 60px;
        font-size: 14px;
        color: #000000;
        margin-right: 100px;
        cursor: pointer;
        transition: color .5s;
    }

    .tabsNav li.active {
        color: #409EFF
    }

    .tabsNav span{ display: block; width: 100%;height: 100%}
    .tabsNav .line {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 56px;
        content: '';
        transition: left .5s;
        height: 4px;
        background: rgba(56, 184, 238, 1);
    }
</style>
