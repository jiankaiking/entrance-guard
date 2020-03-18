<template>
    <div class="agentContenner">
        <div class="tabsCard">
            <div class="tabsNav">
                <ul class="clear">
                    <li v-for="(item,index) in componentArr"
                        @click="agentcheck(index)"
                        :class="{'active':componentIs == item.value}">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <keep-alive>
            <component :is="componentIs" v-if="$route.query.type != 'children'"></component>
        </keep-alive>
        <component  v-if="$route.query.type == 'children'" :is="componentIs"></component>
    </div>
</template>

<script>
    import httpRequest from "../api/api";
    import Agentmessgesbasic from "../views/Agent/Agentmessgesbasic";
    import Information from "../views/Agent/Information";
    import Generation from "../views/Agent/Generation";
    export default {
        name: "AgentHeader",
        data() {
            return {
                componentArr:[
                    {name:'基础信息',value:'Agentmessgesbasic'},
                    {name:'代理信息',value:'Information'},
                    {name:'子代信息',value:'Generation'}
                ],
                componentIs:'Agentmessgesbasic',
                left: 0,
                pageType: '',  //新增，详情 类型判断
            };
        },
        mounted() {
            this.pageType = this.$route.query.type;
            if(this.pageType == 'add' || this.pageType == 'children' ){
                this.componentArr.pop()
                if(this.pageType == 'children'){
                    this.componentIs = 'Agentmessgesbasic'
                }
            }
        },
        components:{
            Agentmessgesbasic,
            Information,
            Generation
        },
        methods: {
            agentcheck(index) {
                    this.componentIs = this.componentArr[index].value;
            }
        },
        computed:{
            myrouter(){
                return this.$route.query
            },
        },
        watch:{
            myrouter(val,old){
                if(val.type == "children"){
                    this.componentIs = 'Agentmessgesbasic';
                    this.componentArr.pop()
                }
            }
        },
    }
</script>

<style scoped>


    .tabsCard {
        margin-bottom: 25px;
        background-color: #ffffff;
        box-shadow:0px 1px 6px 4px rgba(242, 242, 242, 1);
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

    }
    .tabsNav li.active{
        color: #409EFF
    }
</style>
