<template>
    <div class="equipment-lsit">
        <div class="tableData">
            <div class="searchData">
                <el-form ref="form" :model="searchData" label-width="120px">
                    <el-form-item label="设备型号">
                        <el-select v-model="searchData.value" placeholder="选择省">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="repertory-list">
                <div class="repertory-item" v-for="(item,index) in repertoryData">
                    <div class="item-left">
                        <img class="item-image" src="../../assets/images/loginlogo.png" alt="">
                    </div>
                    <div class="item-right">
                        <div class="item-top">
                            <span class="item-name">蜻蜓plus</span>
                            <span class="item-num">蜻蜓plus</span>
                        </div>
                        <div class="total-num">
                            <p>入库总量: 0</p>
                            <p>出库总量: 0</p>
                        </div>
                        <div class="item-btn">
                            <el-button type="primary" plain size="mini" >入库记录</el-button>
                            <el-button type="primary" plain size="mini">出库记录</el-button>
                            <el-button type="primary" plain size="mini"  @click="showPresent(1)">赠送</el-button>
                            <el-button type="primary" plain size="mini"  @click="showPresent(2)">补货</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" align="center" :visible.sync="dialogTableVisible"
                :lock-scroll="false" width="40%" :before-close="handleClose">
            <PresentModel style="padding: 0 50px; box-sizing: border-box" v-if="cliIndex == 1" ref="modalForm" @close="modalClose" @ok="modalFormOk"></PresentModel>
            <EntrepotAddModel v-if="cliIndex == 2" style="padding: 0 150px; box-sizing: border-box"  ref="modalForm" @close="modalClose" @ok="modalFormOk"></EntrepotAddModel>
        </el-dialog>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import EntrepotAddModel from "./moduleModel/EntrepotAddModel";
    import {myMixins} from "../../mixins/mixin";
    import PresentModel from "./moduleModel/PresentModel";

    export default {
        name: "Repertory",
        mixins:[myMixins],
        data() {
            return {
                searchData: {
                    value: 123
                },
                repertoryData: [
                    {name: 123, age: 123},
                    {name: 123, age: 123},
                    {name: 123, age: 123},
                    {name: 123, age: 123}
                ],
                dialogTableVisible:false,
                cliIndex:0,
            }
        },
        methods: {
            showPresent(index){
                this.cliIndex = index
                this.dialogTableVisible = true
            },
        },
        components:{
            PresentModel,
            EntrepotAddModel
        }
    }
</script>

<style scoped>
    .repertory-item {
        display: flex;
    }

    .total-num {
        color: #999999; line-height: 25px;
        font-size: 14px;
        margin: 20px 0;
    }
    .item-btn .el-button{
        padding: 7px 8px;
    }

    .item-top {
        display: flex;
        justify-content: space-between;
    }

    .item-right {
        width: 100%;
    }

    .item-name {
        color: #000000;
        font-size: 18px;
        font-weight: bold;
    }

    .item-num {
        font-size: 16px;
        color: #FD6969;
    }

    .item-left {
        width: 108px;
        height: 160px;
        margin-right: 20px;
    }

    .item-image {
        display: block;
        width: 108px;
        height: 160px;
    }

    .equipment-lsit {
        padding-bottom: 100px;
        overflow: hidden;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
    }

    .searchData {
        box-shadow: none;
        margin-bottom: 0;
        padding-top: 25px;
    }

    .tableData {
        box-shadow: none;
    }

    .repertory-list {

        width: calc(100% + 60px);
        padding: 0 113px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }

    .repertory-item {
        margin-top: 35px;
        width: 420px;
        height: 200px;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 4px;
        flex: 0 0 calc(33.33% - 60px);
        margin-right: 60px;
    }


</style>
