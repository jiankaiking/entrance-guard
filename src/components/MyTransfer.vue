
<template>
    <div class="shuttle">
        <div class="shuttle_item">
            <ul class="school">
                <li v-for="(item,index) in allSchool" :key="index">
                    <el-checkbox :label="item.name" :value="item.value"></el-checkbox>
                </li>
            </ul>
        </div>
        <div class="shuttle_arrow">
            <el-button icon="el-icon-d-arrow-right" type="primary" plain @click="toRightTeam">到右边
            </el-button>
            <el-button icon="el-icon-d-arrow-left" type="primary" plain class="go_left" @click="toLeftSchools">到左边
            </el-button>
        </div>
        <div class="shuttle_item">
            <ul class="school">
                <li v-for="(item ,index ) in allTeam" :key="index">
                    <el-checkbox :label="item.name" :value="item.value"></el-checkbox>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "shuttle",
        data() {
            return {
                allSchool: [
                    {name:'我是1',id:1},
                    {name:'我是2',id:2},
                    {name:'我是3',id:3},
                    {name:'我是4',id:4},
                    {name:'我是5',id:5},
                    {name:'我是6',id:6}
                ],//所有学校
                allTeam: [ {name:'我是7',id:7},
                    {name:'我是8',id:8}],  //所有小组
                schoolsNames: [],   //所有学校 选中的
                teamName: [],   //小组成员  选中的

            }
        },
        props: ["schoolInfo","teamInfo"],
        created() {
        },
        mounted() {
        },
        watch: {
            schoolInfo(val) {   //  编辑时用来回显，添加时的默认数据
                this.schoolInfo = val;
                this.allSchool = val;
            },
            teamInfo(val){   //  编辑时用来回显
                this.teamInfo = val;
                this.allTeam=val;
            },
            leaderInfo(val){   //  编辑时用来回显
                this.leaderInfo=val;
                this.leader=val;
            },
        },
        methods: {
            async toRightTeam() {
                let moveName= await this.matching(this.allSchool,this.schoolsNames);
                let allArr= await this.myFilter(this.allSchool,moveName);
                this.allSchool = allArr;
                for(let i=0;i<moveName.length;i++){
                    this.allTeam.push(moveName[i])
                }
                this.schoolsNames=[];
                await this.putParentsTeams();
            },
            async toLeftSchools() {
                let moveName= await this.matching(this.allTeam,this.teamName);
                let allArr =await this.myFilter(this.allTeam,moveName);
                this.allTeam = allArr;
                for(let i=0;i<moveName.length;i++){
                    this.allSchool.push(moveName[i])
                }
                this.teamName=[];
                await this.putParentsTeams();
            },
            async toRightLeader() {
                if (this.leader.length >= 1||this.teamName.length>1) {
                    this.$message({
                        message: "小组组长只能选一个",
                        type: "error"
                    });
                    return false;
                }
                let moveName= await this.matching(this.allTeam,this.teamName);
                let allArr =await this.myFilter(this.allTeam,moveName);
                this.allTeam = allArr;
                for(let i=0;i<moveName.length;i++){
                    this.leader.push(moveName[i])
                }
                this.teamName=[];
                await this.putParentsTeams();
            },
            async toLeftTeam() {
                let moveName= await this.matching(this.leader,this.teamLeader);
                let allArr =await this.myFilter(this.leader,moveName);
                this.leader = allArr;
                for(let i=0;i<moveName.length;i++){
                    this.allTeam.push(moveName[i])
                }
                this.teamLeader=[];
                await this.putParentsTeams();
            },
            // 过滤 相同选项
            async myFilter(allArr, selArr) {
                let ary03 = [];
                for (let i = 0; i < allArr.length; i++) {
                    for (let j = 0; j < selArr.length; j++) {
                        if (allArr[i].userId == selArr[j].userId) {
                            allArr.splice(i,1);
                        }
                    }
                }
                return allArr;
            },
            //  匹配 移动的 选项
            async matching(allArr, matchArr) {
                let matArr = [];
                for (let i = 0; i < allArr.length; i++) {
                    for (let j = 0; j < matchArr.length; j++) {
                        if (allArr[i].userId == matchArr[j]) {
                            matArr.push(allArr[i]);
                        }
                    }
                }
                return matArr;
            },
            //    向父组件传组员名称 和组长id   由于这是单独的一个穿梭框组件，数据会和父组件里面的动态绑定，提交按钮也在父组件，所以需要此步骤，
            async putParentsTeams() {
                this.$emit('teamNames', this.allTeam,this.leader);
            },
        },

    }
</script>

<style lang="scss" scoped>
    ul li {
        list-style: none;
    }

    .shuttle {
        display: flex;
        flex-direction: row;
        justify-content: center;

        .shuttle_item {
            width: 20%;

            span {
                font-size: 16px;
                margin-left: 50px;
            }
        }

        .shuttle_arrow {
            width: 10%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 30px 0 20px;

            .go_left {
                margin-left: 0;
                margin-top: 15px;
            }
        }

        .school {
            border: 1px solid #c8c9cc;
            padding: 0 10px;
            border-radius: 5px;
            height: 150px;
            overflow: auto;

            li {
                padding-top: 10px;
            }
        }
    }
</style>
