<template>
    <div class="agentContenner">
        <div class="tabsCard">
            <div class="tabsNav">
                <ul class="clear">
                    <li v-for="(item,index) in componentArr" @click="agentcheck($event,index)"
                        :class="{active:cli == index}">{{item.name}}
                    </li>

                </ul>
                <div class="line" :style="{left:left}"></div>
            </div>
        </div>
        <keep-alive>
            <component :is="isComponents"></component>
        </keep-alive>
    </div>
</template>

<script>
    import BasicsInfo from "./Tab/BasicsInfo";
    import ContractInfo from "./Tab/ContractInfo";

    export default {
        name: "MerchantInfo",
        data() {
            return {
                cli: 0,
                left:'',
                isComponents: 'BasicsInfo',
                componentArr: [{name: '基础信息', value: 'BasicsInfo'}, {
                    name: '签约信息', value: 'ContractInfo'
                }]
            }
        },
        components: {
            BasicsInfo,
            ContractInfo
        },
        methods: {
            agentcheck(e, num) {
                let widtha = e.target.getBoundingClientRect().width;
                this.left = widtha * num + 100 * num + 'px'
                this.cli = num;
                this.isComponents = this.componentArr[num].value
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
