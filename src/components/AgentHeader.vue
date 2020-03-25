<template>
    <div class="agentContenner">
         <div class="option-btn">
            <span
                    v-for="(item,index)
                    in componentArr"
                    :class="{'active': item.value == componentIs}"
                    @click="agentCheck(index)" :key='index'>{{item.name}}</span>
        </div>
        <component :is="componentIs"></component>
        <!-- <div class="tabsCard">
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
        <component  v-if="$route.query.type == 'children'" :is="componentIs"></component> -->
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
                routerFlag:false,
                pageType: '',  //新增，详情 类型判断
            };
        },
        mounted() {
            if(this.$route.query.type == 'add'){
                this.componentArr.pop()
            }
            // console.log(this.$route.query)
            this.pageType = this.$route.query.type;
            // if(this.pageType == 'add' || this.pageType == 'children' ){
            //     // this.componentArr.pop()
            //     if(this.pageType == 'children'){
            //         this.componentIs = 'Agentmessgesbasic'
            //     }
            // }
        },
        components:{
            Agentmessgesbasic,
            Information,
            Generation
        },
        methods: {
            agentCheck(index) {
               this.componentIs = this.componentArr[index].value
            },
        },
        computed:{
            myrouter(){
                return this.$route.query
            },
        },
        watch:{
            // myrouter(val,old){

            //     if(val.type == "children"){
            //         this.componentIs = 'Agentmessgesbasic';
            //         this.componentArr.pop()
            //     }
                
            // },
            $route: {
                handler: function(val, oldVal){
                    if(this.$route.query.type=='add'){
                        this.componentIs='Information'
                    }else{
                        this.componentIs='Agentmessgesbasic'
                    }
                },
                // 深度观察监听
                deep: true
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
    .option-btn {
        width: 100%;
        background: #ffffff;
        height: 60px;
        padding: 0 69px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        margin-bottom: 25px;

    }

    .option-btn span {
        line-height: 60px; cursor: pointer;
        font-size: 14px;
        height: 60px;
        color: #000000;
        display: inline-block;
        margin-right: 100px;
        position: relative;
    }

    .active::before {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        content: "";
        height: 3px;
        background: #38B8EE;
    }

    .option-btn span.active {
        color: #38B8EE;

    }
</style>
