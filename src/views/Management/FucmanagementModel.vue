<template>
    <el-form class="funcmanang-model" ref="form"  :model="modelFromdata">
        <el-form-item label="角色名称:" prop="taskName">
            <el-input v-model="modelFromdata.roleName" />
        </el-form-item>
        <el-form-item label="角色状态" prop="taskStatus">
            <el-radio-group v-model="modelFromdata.roleStatus">
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleRemarks">
            <el-input v-model="modelFromdata.roleRemarks" type="textare"/>
        </el-form-item>
        <div>123123213</div>
        <el-form-item  prop="menuIds">
            <el-transfer v-model="modelFromdata.menuIds" :data="data"></el-transfer>
        </el-form-item>
        <el-form-item>
            <div style="margin: 0 auto; width: 200px">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handleOk">保存</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import httpRequest from "../../api/api";

    export default {
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项`,
                        disabled: false
                    });
                }
                return data;
            };
            return {
                modelFromdata:{
                    roleName:'',
                    roleStatus:'',
                    roleRemarks:'',
                    menuIds:'',
                },
                data: generateData(),
                value: [1, 4],
                url: {
                    add: '/roleManagec/addRole',
                    edit: '/roleManagec/edit'
                },
            };
        },
        mounted(){

        },
        methods: {
            add(abc) {
                // console.log(this.modelFromdata)
                this.edit({roleName:'王凯'});
            },
            edit(record) {

                this.$refs.form.resetFields()

                this.modelFromdata = Object.assign({},record)
              //  console.log( this.modelFromdata)
                // this.$nextTick(() => {
                //
                // });
            },
            close() {
                this.$emit('close');
            },
            handleOk() {
                const that = this;
                // 触发表单验证
                let httpurl = '';
                let method = 'post';
                if (!this.modelFromdata.id) {
                    httpurl= this.url.add;
                } else {
                    httpurl = this.url.edit;
                }
                httpRequest(httpurl,method, this.modelFromdata).then((res) => {
                    if (res.success) {
                        that.$message.success(res.message);
                        that.$emit('ok');
                    } else {
                        that.$message.warning(res.message);
                    }
                }).finally(() => {
                    that.close();
                })

            },
        },
    };
</script>
<style lang="scss">
        .funcmanang-model .el-form-item {
            width: 300px;
        }

        .funcmanang-model .el-transfer-panel__header {
            display: none;
        }

        .funcmanang-model .el-transfer-panel__item .el-checkbox__input {
            left: 35px;
        }
</style>

