<template>
    <div class="histonav">
        <div>
            <ul class="clear">
                <li @contextmenu.prevent="show($event,index)"
                    ref="box" v-for="(item,index) in menuTagArr"
                    @click="changePath(item)">
                    <span>{{item.title}}</span>
                    <i class="el-icon-close"></i>
                </li>
            </ul>
        </div>
        <p>近店 / 权限管理 / 组织架构管理</p>
        <div class="menucont" v-show="showMenu" :style="{left:left,top:top}">
            <ul>
                <li @click.stop="closeAll()"><i class="el-icon-refresh-left"></i>刷新</li>
                <li @click.stop="closeRight()"><i class="el-icon-right"></i>关闭右边</li>
                <li @click.stop="closeLeft()"><i class="el-icon-back"></i>关闭左边</li>
                <li @click.stop="closeAnother()"><i class="el-icon-close"></i>关闭其他</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "GlobalHistorynav",
        data() {
            return {
                historyNav: [{name: '首页'}, {name: '首页'}, {name: '首页'}],
                showMenu: false,
                left: '',
                top: ''
            }
        },
        mounted() {
            //  console.log(this.$route.path)
            document.addEventListener('click', (e) => {
                if (e.target.className != 'closeAll') {
                    this.showMenu = false;
                } else {
                    console.log(1)
                }

            })
        },
        methods: {
            changeColor(index) {
                console.log(1)
            },

            //关闭全部
            closeAll() {
                console.log(this.menuTagArr)
            },
            //关闭右边
            closeRight() {


            },
            //关闭左边
            closeLeft() {

            },
            //关闭其他
            closeAnother() {

            },
            changePath() {

            },
            show(e, index) {
                this.navIndex = index
                this.left = e.clientX + 'px';
                this.showMenu = true;
                this.top = e.clientY + 'px'
            },
        },
        computed: {
            ...mapState(['menuTagArr'])
        }
    }
</script>

<style scoped>
    .histonav .clear li {
        float: left;
        width: 138px;
        padding: 0 27px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 25px;
        line-height: 36px;
        height: 36px;
        background: white;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
        font-size: 14px;
        color: #4589A5;
        border-radius: 18px;
    }

    .histonav .clear li:hover {
        cursor: pointer;
        background: #38B8EE;
        color: #ffffff;
    }

    .histonav .clear li:hover i {
        color: #ffffff;
    }

    .histonav .menucont {
        box-shadow: 2px 2px 10px #aaa !important;
        background: #fff;
        border: 1px solid #ccc;
        position: fixed;
        z-index: 220;
    }

    .histonav .menucont li {
        padding: 0 18px;
        height: 50px;
        line-height: 50px;
        color: rgba(0, 0, 0, 0.65);
        cursor: default;
    }

    .histonav .menucont li i {
        margin-right: 5px;
        font-size: 16px;
    }

    .histonav .menucont li:hover {
        cursor: pointer;
        color: #409EFF;
    }

    .histonav .menucont li:hover i {
        color: #409EFF;
    }

    .histonav p {
        color: #666666;
        font-size: 14px;
        padding: 20px 0;
    }
</style>
