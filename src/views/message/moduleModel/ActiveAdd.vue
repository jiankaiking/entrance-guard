<template>
    <div class="business-form padding-all">
        <el-form ref="modelFrom" :model="modelFromdata" style="padding-right: 70px; box-sizing: border-box"
                 label-width="170px" :rules="rules">
            <div class="title">新增活动</div>
            <el-form-item :label="modelFromdata.newsModule == 1?'公告主题':'活动主题'" prop="subject">
                <el-col :span="8">
                    <el-input placeholder="请输入活动主题" v-model="modelFromdata.subject"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item :label="modelFromdata.newsModule == 1?'公告类型':'活动类型'" prop="newsType">
                <el-col :span="8">
                    <el-input placeholder="请输入活动类型" v-model="modelFromdata.newsType"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="通知对象" prop="noticeObjectType">
                <el-col :span="1">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                </el-col>
                <el-col :span="8">
                    <el-checkbox-group v-model="modelFromdata.noticeObjectType" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city.val" :key="city.val">{{city.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-form-item>
            <el-form-item style="vertical-align: top" label="活动有效期" prop="endTime">
                <el-col :span="6">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"
                                    style="width: 100%;" v-model="modelFromdata.startTime"></el-date-picker>
                </el-col>
                <el-col :span="1" style="text-align: center">至</el-col>
                <el-col :span="6">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期"
                                    style="width: 100%;" v-model="modelFromdata.endTime"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="缩略图" prop="thumbnailUrl">
                <uploadImg :img-url.sync="modelFromdata.thumbnailUrl"></uploadImg>
            </el-form-item>
            <el-form-item label="活动海报" prop="postersUrl" v-if="modelFromdata.newsModule != 1">
                <uploadImg :img-url.sync="modelFromdata.postersUrl"></uploadImg>
            </el-form-item>
            <el-form-item label="活动内容" prop="content">
                <el-col :span="15">
                    <el-input type="textarea" placeholder="请输入不超过50字" v-model="modelFromdata.content" maxlength="50"
                              :rows="6"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button @click="back">取消</el-button>
                <el-button class="myDefult-btn" @click="addActive('modelFrom')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import uploadImg from "../../../components/uploadImg/uploadImg";
    import httpRequest from "../../../api/api";

    const cityOptions = [{name: '商户', val: 1}, {name: '子代', val: 2}, {name: '代理商', val: 3}, {
        name: '合伙人',
        val: 4
    }, {name: 'OEM代理商', val: 5}];
    export default {
        name: "ActiveAdd",
        data() {
            return {
                modelFromdata: {
                    subject: '', //主题
                    newsModule: '', //消息所属模块 1 公告 2 商户活动 3 代理商活动
                    newsType: '', //消息类型（从系统参数获取）
                    noticeObjectType: [], //通知对象类型 1商户 2子代 3代理商 4合伙人 5 OEM代理商
                    thumbnailUrl: '', //缩略图url
                    postersUrl: '', //海报url（公告不传，活动必传）
                    content: '', // 内容(富文本)
                    startTime: '', //活动开始时间（公告不传，活动必传）
                    endTime: '', //活动结束时间（公告不传，活动必传）
                },
                rules: {
                    subject: [{required: true, message: '请输入活动主题', trigger: 'blur'}],
                    newsType: [{required: true, message: '请输入消息类型', trigger: 'blur'}],
                    noticeObjectType: [{required: true, type: 'array', message: '请输入消息类型', trigger: 'change'}],
                    thumbnailUrl: [{required: true, message: '请上传缩略图', trigger: 'change'}],
                    postersUrl: [{required: true, message: '请上传海报', trigger: 'change'}],
                    startTime: [{required: true, message: '请选择开始时间', trigger: 'change'}],
                    content: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    endTime: [{required: true, message: '请选择结束时间', trigger: 'change'}]
                },
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                isIndeterminate: false
            }
        },
        components: {
            uploadImg
        },
        mounted() {
            this.modelFromdata.newsModule = this.$route.query.type;
        },
        methods: {
            //全选
            handleCheckAllChange(val) {

                this.modelFromdata.noticeObjectType = val ? cityOptions.map(item => item.val) : [];
                this.isIndeterminate = false;

            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            back() {
                this.$router.go(-1)
            },
            add() {
                httpRequest("/managecenter/ad/news/center/save", "POST", this.modelFromdata)
                    .then(res => {
                        if (res.success) {
                            this.back()
                            this.$message.success(res.msg)
                        }
                    })
            },
            addActive(fromName) {
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        this.add()
                    } else {
                        console.log(this.modelFromdata)
                        return false
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .padding-all {
        padding: 25px;
        box-sizing: border-box;
    }
</style>
