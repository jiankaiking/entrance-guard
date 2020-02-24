<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="菜单名称">
                    <el-input v-model="searchData.menuName"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="searchData.menuStatus" placeholder="请选择状态">
                        <el-option label="启动" :value="0"></el-option>
                        <el-option label="停止" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick">搜索</el-button>
                    <el-button type="primary" @click="addMenu">新增</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox" style="display: flex;">

                <div class="left-menu-nav">
                    <p class="listRigth">菜单名称</p>
                </div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 99.9%">
                    <el-table-column
                            prop="name"
                            label="层级名称"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            align="center"
                            label="排序">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            align="center"
                            label="类型">
                    </el-table-column>
                    <el-table-column
                            prop="menuUrl"
                            align="center"
                            label="请求地址">
                    </el-table-column>
                    <el-table-column
                            prop="menuStatus"
                            align="center"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            align="center"
                            label="连接目标">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            align="center"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template>
                            <el-button type="text">隐藏</el-button>
                            <el-button type="text">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        :total="400"
                        layout=" sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>

        </div>
        <el-dialog title="收货地址" width="30%" :visible.sync="dialogTableVisible">

            <MenuaddModel></MenuaddModel>
        </el-dialog>
    </div>
</template>

<script>
    import MenuaddModel from './MenuaddModel';
    import {myMixins} from "../../mixins/mixin";
    export default {
        name: "Organization",
        mixins:[myMixins],
        data() {
            return {
                searchData:{
                    menuName: '',
                    menuStatus: '',
                    page:1,
                    size:10
                },
                value:'',
                total:0,
                listUrl:'/menuManage/getMenuList',
                tableData: []
            }
        },
        components: {
            MenuaddModel
        },
        methods: {
        }

    }
</script>

<style scoped>
    .left-menu-nav {
        border: 1px solid #ebeef5;
        border-right: none;
    }
    .left-menu-nav .listRigth {
        color: #000000;
        font-size: 14px;
    }

    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px #f2f2f2;
    }
    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;
    }
    .tableData .pagination {
        padding-bottom: 30px;
    }

</style>
