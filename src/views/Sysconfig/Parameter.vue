<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="参数名">
                    <el-input v-model="searchData.paramName"></el-input>
                </el-form-item>
                <el-form-item label="所属模块">
                    <el-input v-model="searchData.paramModule"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table empty-text :data="tableData" border style="width: 99.9%">
                    <el-table-column align="center" prop="paramId" label="参数ID"></el-table-column>
                    <el-table-column align="center" prop="paramName" label="参数名"></el-table-column>
                    <el-table-column align="center" prop="paramValue" label="参数值"></el-table-column>
                    <el-table-column align="center" prop="paramModule" label="所属模块"></el-table-column>
                    <el-table-column align="center" prop="paramDesc" label="说明"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info" plain @click="headEdit(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="searchData.size"
                        :total="total"
                        layout=" sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog :lock-scroll="false" title="收货地址" center width="30%" :visible.sync="dialogTableVisible">
            <ParameterModel  ref="modalForm" @close="modalClose" @ok="modalFormOk"></ParameterModel>
        </el-dialog>
    </div>
</template>

<script>
    import httpRequest from "../../api/api";
    import {myMixins} from "../../mixins/mixin";
    import ParameterModel from "./ParameterModel";
    export default {
        name: "Organization",
        mixins:[myMixins],
        data() {
            return {
                searchData:{
                    paramName:'',
                    paramModule:'',
                    page:1,
                    size:10,
                },
                total:null,
                dialogTableVisible: false,
                listUrl:'/paramManage/getParamList',
                tableData: []
            }
        },
        components:{
            ParameterModel
        },
        mounted(){

        },
        methods: {
        },


    }
</script>

<style scoped lang="scss">




    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);

        .tableBox {
            padding: 30px;
            box-sizing: border-box;

        }

        .pagination {
            padding-bottom: 30px;
        }
    }
</style>
