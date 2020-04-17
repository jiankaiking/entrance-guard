 <template>
    <el-form label-width="120px" class="margin-p">
        <el-form-item label="活动主题:">
            <p>{{modelFromdata.subject}}</p>
        </el-form-item>
        <el-form-item label="发布时间:">
            <p>{{modelFromdata.createTime}}</p>
        </el-form-item>
        <el-form-item label="活动类型:">
            <p>{{modelFromdata.newsType}}</p>
        </el-form-item>
        <el-form-item label="发布机构:">
            <p>{{modelFromdata.organName}}</p>
        </el-form-item>
        <el-form-item label="缩略图:">
            <p><img :src="modelFromdata.thumbnailUrl" alt=""></p>
        </el-form-item>
        <el-form-item label="活动海报:">
            <p><img :src="modelFromdata.postersUrl" alt=""></p>
        </el-form-item>
        <el-form-item label="内容:">
            <el-col :span="15">
                <el-input type="textarea" placeholder="请输入不超过50字" :value="modelFromdata.content" maxlength="50"
                          :rows="6"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button @click="back">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "BusinessActiveModel",
        data(){
            return{
                 modelFromdata:{},
            }
        },
        methods:{
            edit(row){
                this.modelFromdata = JSON.parse(JSON.stringify(row))
            },
            back(){
                this.$emit("close")
            },
        }
    }
</script>

<style scoped>
.margin-p p{
    margin-left:30px ;
}
    .margin-p img{
        display: block; width: 160px; height: 90px;
    }
</style>
