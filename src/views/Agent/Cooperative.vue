<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="">
                    <el-input v-model="searchData.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchClick">搜索</el-button>
                    <el-button type="info" style="margin: 0 15px;" plain>重置</el-button>
                    <el-button type="success" @click="headAdd" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" empty-text border style="width: 99.9%">
                    <el-table-column align="center" prop="date" label="合作商"></el-table-column>
                    <el-table-column prop="name" label="联系方式" align="center"></el-table-column>
                    <el-table-column prop="address" align="center" label="安全密钥"></el-table-column>
                    <el-table-column prop="address" align="center" label="回调地址"></el-table-column>
                    <el-table-column prop="address" align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text">查看密钥</el-button>
                            <el-button type="text" @click="headEdit(scope)">修改</el-button>
                            <el-button type="text" @click="delData(scope.row.id)">删除</el-button>
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

    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";

    export default {
        name: "cooperative",
        mixins: [myMixins],
        data() {
            return {
                searchData: {
                    name: '',
                    page: 1,
                    size: 10
                },
                dialogTableVisible: false,
                tableData: []
            }
        },
        methods: {

            onSubmit() {
                console.log('submit!');
            }
        }

    }
</script>

<style scoped>


    .tableData {
        background: #ffffff;
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);

    }

    .tableData .tableBox {
        padding: 30px;
        box-sizing: border-box;

    }

    .tableData .pagination {
        padding-bottom: 30px;
    }
</style>
