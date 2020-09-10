<template>
    <el-dialog title="区域信息" :visible.sync="centerDialogVisible" width="30%" center>
        <el-form label-width="120px" ref="form" :model="modelFromdata" :rules="rules">
            <el-form-item label="区域类型" prop="areaTypeId">
                <el-select v-model="modelFromdata.areaTypeId" clearable placeholder="请选择区域类型">
                    <el-option v-for="item in areaTypeArr" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域名称" prop="areaName">
                <el-input v-model="modelFromdata.areaName" placeholder="请输入区域名称"/>
            </el-form-item>
            <el-form-item label="上级区域" prop="areaPid">
                <el-cascader
                        :options="options"
                        :placeholder="modelFromdata.areaPidName"
                        ref="cascader"
                        v-model="modelFromdata.areaPid"
                        :props="{ checkStrictly: true,lazy:true,lazyLoad:loadSelect,label: 'treeName',value:'id', }"
                        clearable></el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import httpRequest from "../../../api/api";

    export default {
        props: {
            areaType: {
                type: Array,
            }
        },
        data() {
            return {
                centerDialogVisible: false,
                modelFromdata: {
                    areaTypeId: '',
                    areaName: '',
                    areaPid: '',
                    areaLevel: '',
                },
                rules: {
                    areaTypeId: {required: true, message: '请选择区域类型', trigger: 'change'},
                    areaName: {required: true, message: '输入区域名称', trigger: 'blur'},
                    areaPid: {required: true, message: '选择上级区域', trigger: 'change'},
                },
                url: {
                    add: '/property-manage/area/info/insert',
                    edit: '/property-manage/area/info/update',
                    areaTree: '/property-manage/area/info/tree/area',
                    areaTreeInfo: '/property-manage/area/info/tree',
                },
                options: [],
                areaArr: [],
                areaTypeArr: [],

            }
        },
        mounted() {
            this.getTree()
        },
        methods: {
            clearFormData(){
               Object.keys(this.modelFromdata).map(key=>{this.modelFromdata[key] = ''})
            },
            add() {
                this.clearFormData()
                this.centerDialogVisible = true;
            },
            edit(row){
                this.add()
                console.log(row)
                this.modelFromdata.areaTypeId = row.areaTypeId;
                this.modelFromdata.areaName = row.areaName;
                this.modelFromdata.areaPidName = row.areaPidName
                this.modelFromdata.areaPid = row.areaPid
                this.modelFromdata.id = row.id;
            },
            //机构树形
            getTree() {
                httpRequest(this.url.areaTreeInfo, 'GET', {level: 0, pid: 0})
                    .then(res => {
                        this.options = res.data;
                    })
            },
            loadSelect(node, resolve) {
                // console.log(node, resolve)
                const level = node.level;
                const pid = node.level == 2 ? node.data.pid : node.data.id;
                let url = node.data.type == 0 ? (level == 3 ? this.url.areaTree : this.url.areaTreeInfo) : this.url.areaTree;
                httpRequest(url, 'GET', {level, pid})
                    .then(res => {
                        resolve(res.data);
                    })
            },
            ok() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const that = this;
                        let item = this.$refs['cascader'].getCheckedNodes()[0];
                        let url = this.modelFromdata.id ? this.url.edit : this.url.add
                        let data = JSON.parse(JSON.stringify(this.modelFromdata))
                        data.areaPid = item.data.pid?item.data.pid:item.data.id;
                        data.areaLevel = this.modelFromdata.areaPid.length
                         // console.log(data)
                        httpRequest(url, 'post', data)
                            .then((res) => {
                                if (res.code === 200) {
                                    this.centerDialogVisible = false;
                                    this.$emit("ok")
                                }
                            })
                    } else {
                        return false;
                    }
                });
            },
        },
        watch: {
            areaType: {
                handler(newValue, oldValue) {
                    this.areaTypeArr = newValue
                },
                deep: true
            }
        }
        ,
    }
</script>

<style scoped>

</style>
