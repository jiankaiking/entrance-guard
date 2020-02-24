<template>
    <div class="userMessges clear">
        <div class="user-via">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="userMessges-all">
            <div class="userButton">
                <el-button type="primary" plain>更换头像</el-button>
                <el-button>注销登录</el-button>
            </div>
            <el-form label-width="80px">
                <el-form-item label="密码">
                    <i style="color: #333333;font-size: 28px; margin-right: 22px" class="el-icon-edit-outline"></i>
                    <el-button type="text">修改密码</el-button>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="用户名">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <el-form-item label="手机号">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="邮箱">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <el-form-item label="部门">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="创建时间">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <el-form-item label="所属角色">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="首页设置">
                    <div>
                        <el-checkbox>常用功能</el-checkbox>
                    </div>
                    <div>
                        <el-checkbox>常用功能</el-checkbox>
                    </div>
                    <div>
                        <el-checkbox>常用功能</el-checkbox>
                    </div>
                </el-form-item>
                <el-form-item>
                   <div class="button-cont">
                       <el-button style="margin-right: 70px">取消</el-button>
                       <el-button>保存</el-button>
                   </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Usermessges"
    }
</script>


<style scoped lang="scss">
.button-cont{
    margin:100px 60px; width: 300px;
    button{
        width: 100px; height: 36px;
    }
}
    .userMessges {

        background-color: #ffffff;
        padding: 20px 40px 20px 0;

        .user-via {
            margin-right: 30px;
            float: left;
            width: 90px;
            height: 90px;

            img {
                display: block;
                width: 90px;
                height: 90px;
            }
        }

        .userMessges-all {
            float: left;
            width: 80%;

            .userButton {
                height: 90px;

                button {
                    width: 100px;
                    height: 36px;
                    margin-top: 27px;
                }
            }
        }
    }
</style>
