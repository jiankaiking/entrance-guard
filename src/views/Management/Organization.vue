<template>
    <div class="main-contenner">
        <div class="searchData">
            <el-form ref="form" :model="searchData" label-width="80px">
                <el-form-item label="部门名称">
                    <el-input v-model="searchData.organName"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchData.organStatus" placeholder="请选择活动区域">
                        <el-option label="区域一" value="0"></el-option>
                        <el-option label="区域二" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchClick" type="primary" plain>搜索</el-button>
                    <el-button @click="headAdd" type="success" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableData">
            <div class="tableBox">
                <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id"
                        border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column prop="date" label="组织机构层级"  align="center"></el-table-column>
                    <el-table-column prop="name" label="分类"  align="center"></el-table-column>
                    <el-table-column align="center" prop="address" label="主要负责人"></el-table-column>
                    <el-table-column align="center" prop="address" label="电话"></el-table-column>
                    <el-table-column align="center" prop="address" label="人数"></el-table-column>
                    <el-table-column align="center" prop="address" label="状态"></el-table-column>
                    <el-table-column align="center" prop="address" label="备注"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template>
                            <el-button type="text" @click="edit">编辑</el-button>
                            <el-button type="text">停用</el-button>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :lock-scroll="false" class="organnizaDia" title="收货地址" width="30%" center :visible.sync="dialogTableVisible">
            <OrganizationModel></OrganizationModel>
        </el-dialog>
    </div>
</template>

<script>
    import {myMixins} from "../../mixins/mixin";
    import OrganizationModel from "./OrganizationModel";

    export default {
        name: "Organization",
        mixins:[myMixins],
        data() {
            return {
                searchData: {
                    organStatus:'',//状态
                    organName:'',//机构名称、部门名称
                },
                listUrl:'/organManage/getOrganList',
                dialogTableVisible: false,
                tableData: [],
            }
        }
        ,
        components: {
            OrganizationModel
        }
        ,
        methods: {

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

