<template>
    <el-form class="funcmanang-model" label-width="120px" :rules="rules" ref="form" :model="modelFromdata">
        <el-form-item label="角色名称:" class="padding-box" prop="roleName">
            <el-input v-model="modelFromdata.roleName"/>
        </el-form-item>
        <el-form-item label="角色状态" class="padding-box" style="text-align: left">
            <el-radio-group v-model="modelFromdata.roleStatus">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">停用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="角色描述" class="padding-box">
            <el-input type="textarea" :rows="4" v-model="modelFromdata.roleRemarks"/>
        </el-form-item>
        <div style="margin: 20px 0;">配置管理</div>
        <el-form-item label-width="0"  prop="menuIds">
            <treeTransfer :from_data='fromData' pid="menuPid" node_key="menuId" :to_data='toData'
                          :defaultProps="{label:'menuName'}"
                          ref="menuData"
                          @addBtn='addMove' @removeBtn='remove' mode='transfer' filter openAll>
            </treeTransfer>
            <el-row>
                <el-col :span="3" :offset="6">
                    <el-checkbox v-model="checkToall" @change="changeCheckAll($event,1)">全选</el-checkbox>
                </el-col>
                <el-col :span="3" :offset="7">
                    <el-checkbox v-model="checkFormall" @change="changeCheckAll($event,2)">全选</el-checkbox>
                </el-col>
            </el-row>

        </el-form-item>
        <el-form-item label-width="0">
            <div style="margin: 0 auto; width: 200px">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handleOk('form')">保存</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import treeTransfer from 'el-tree-transfer'
    import httpRequest from "../../api/api";


    export default {

        data() {
            const checkMenuIds = (rule, value, callback) => {
                if (this.modelFromdata.menuIds.length>0) {
                    callback()
                } else {
                    callback(new Error('请选择菜单'))
                }
            }
            return {
                modelFromdata: {
                    roleName: '',
                    roleStatus: 1,
                    roleRemarks: '',
                    menuIds: [],
                },
                checkToall: false,
                rules:{
                    roleName:[{required: true, message: '请输入角色名称', trigger: 'blur'}],
                    menuIds:[{validator:checkMenuIds,trigger: 'change'}]
                },
                checkFormall: false,
                menuIds: [],
                fromData: [],
                toData: [],
                url: {
                    add: '/managecenter/roleManage/addRole',
                    info: '/managecenter/roleManage/getRoleInfo',
                    edit: '/managecenter/roleManage/editRole'
                },
            };
        },
        mounted() {
            this.checkFalse()
        },
        components: {treeTransfer},
        methods: {
            checkFalse() {
                this.checkToall = false
                this.checkFormall = false
            },
            // 监听穿梭框组件添加
            addMove(fromData, toData, obj) {
                // console.log("obj:", obj);
                this.checkFalse()
                this.modelFromdata.menuIds = this.modelFromdata.menuIds.concat(obj.keys,obj.harfKeys)
                // console.log(this.modelFromdata.menuIds)
            },
            sortArr(arr) {
                if (arr.length > 0) {
                    arr.forEach(item => {
                        this.modelFromdata.menuIds.push(item.menuId)
                        if (item.children.length > 0) {
                            this.sortArr(item.children)
                        }
                    })
                }
            },
            // 监听穿梭框组件移除
            remove(fromData, toData, obj) {
                this.checkFalse()
                let arr1 = this.modelFromdata.menuIds
                let arr2 = obj.keys;
                for (let i = 0; i < arr2.length; i++) {
                    for (let j = 0; j < arr1.length; j++) {
                        if (arr2[i] == arr1[j]) {
                            let indexs = arr1.indexOf(arr1[j]);
                            arr1.splice(indexs, 1);
                        }
                    }
                }
                this.modelFromdata.menuIds = arr1;
            },

            //获取菜单
            getMenuAll() {
                httpRequest("/managecenter/menuManage/getMenuTreeToRole", "GET")
                    .then(res => {
                        this.fromData = res.data
                    })
            },
            changeCheckAll(e, index) {
                if (index === 1) {
                    this.$refs.menuData.fromAllBoxChange(e)
                } else {
                    this.$refs.menuData.toAllBoxChange(e)
                }


            },
            add() {
                this.getMenuAll()
                this.modelFromdata.roleName = ''
                this.modelFromdata.roleStatus = 1
                this.modelFromdata.roleRemarks = ''
                this.modelFromdata.roleId = null
                this.modelFromdata.menuIds = []
                this.toData = []
            },
            //编辑  查询选择未选择的角色菜单
            edit(record) {
                httpRequest(this.url.info, "GET", {roleId: record.roleId})
                    .then(res => {
                        if (res.success) {
                            this.modelFromdata = Object.assign(this.modelFromdata, res.data)
                            this.modelFromdata.menuIds = []
                            return httpRequest("/managecenter/menuManage/getUnSelectedMenuTreeByRoleId", "GET", {roleId: record.roleId})
                        }
                    })
                    .then(res => {
                        if (res.success) {
                            this.fromData = res.data;
                            return httpRequest("/managecenter/menuManage/getSelectedMenuTreeByRoleId", "GET", {roleId: record.roleId})
                        }
                    })
                    .then(res => {
                        if (res.success) {
                            this.sortArr(res.data)
                            this.toData = res.data;
                        }
                    })
            },
            close() {
                this.$emit('close');
            },
            addEdit(){
                const that = this;
                // 触发表单验证
                console.log(this.modelFromdata.menuIds)
                this.modelFromdata.menuIds = Array.from(new Set(this.modelFromdata.menuIds)).join(',')
                let httpurl = '';
                if (!this.modelFromdata.roleId) {
                    httpurl = this.url.add;
                } else {
                    httpurl = this.url.edit;
                }
                httpRequest(httpurl, "POST", this.modelFromdata).then((res) => {
                    if (res.success) {
                        that.$message.success(res.msg);
                        that.$emit('ok');
                    } else {
                        that.$message.warning(res.msg);
                    }
                }).finally(() => {
                    that.close();
                })
            },
            //确认按钮
            handleOk(fromName) {
                let that = this;
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        that.addEdit()
                    } else {
                        return false;
                    }
                });
                // console.log(this.toData)


            },
        },
    };
</script>
<style lang="scss">
    .el-transfer-panel__header {
        display: none;
    }


    .el-transfer-panel__item .el-checkbox__input {
        .el-transfer-panel__item .el-checkbox__input {
            left: 35px;
        }
    }

    .funcmanang-model {
        padding: 0 30px;
        box-sizing: border-box;
    }

    .padding-box {
        padding: 0 50px;
        box-sizing: border-box;
    }
</style>
