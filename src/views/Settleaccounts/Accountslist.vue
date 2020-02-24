<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="30px">
                <el-form-item style="width: 140px">
                    <el-select v-model="searchData.province" placeholder="选择省">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 140px">
                    <el-select v-model="form.region" placeholder="选择市">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 218px">
                    <el-select v-model="form.region" placeholder="代理人名称/联系人/联系方">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 160px" label="状态" label-width="60px">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请结算时间" label-width="120px">
                    <el-date-picker
                            v-model="value1"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary" plain>搜索</el-button>
                    <el-button @click="onSubmit" type="info" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table
                        empty-text
                        header-row-style="color:#000000"
                        :data="tableData"
                        border
                        style="width: 100%;">
                    <el-table-column
                            align="center"
                            prop="date"
                            label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="代理商名称"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="联系人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="结算金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="代理区域">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="结算状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="申请时间">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="settleAccounts()">结算</el-button>
                            <el-button type="text" @click="showModel">详情</el-button>
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
        name: "accountslist",
        mixins:[myMixins],
        data() {
            return {
                searchData: {
                    province:123,
                },
                total:0,

                dialogTableVisible: false,
                tableData: [],
                listUrl:'abc/get'
            }
        },
        methods: {}

    }
</script>

<style scoped>

</style>
