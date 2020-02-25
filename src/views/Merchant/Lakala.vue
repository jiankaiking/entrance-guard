<template>
    <el-form class="business-form" label-width="140px">
        <div class="top-select">
            <label style="margin-right: 15px;">进件通道</label>
            <el-select>
                <el-option>通道二-新大陆</el-option>
                <el-option>通道2新大陆</el-option>
                <el-option>通道3新大陆</el-option>
            </el-select>
        </div>
        <div class="title">二维码</div>
        <el-form-item label="商户类型">
            <el-radio-group>
                <el-radio label="0">企业</el-radio>
                <el-radio label="1">个体户</el-radio>
                <el-radio label="2">个人</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-row>
            <el-col :span="8">
                <el-form-item label="商户名称">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="商户简称">
                    <el-input/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="联系人">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="联系电话">
                    <el-input/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="邮箱">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="地址">
                    <el-col :span="7">
                        <el-select></el-select>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-select></el-select>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-select></el-select>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="详细地址">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="经营类目">
                    <el-col :span="7">
                        <el-select></el-select>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-select></el-select>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">结算信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="结算类型">
                    <el-radio-group>
                        <el-radio label="0">法人结算</el-radio>
                        <el-radio label="1" disabled>非法人结算</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="账户类型">
                    <el-radio-group>
                        <el-radio label="0">代理商</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="开户银行">
                    <el-select></el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="开户支行地区">
                    <el-col :span="7">
                        <el-select></el-select>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-select></el-select>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-select></el-select>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="支行名称">
                    <el-select></el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="户名">
                    <el-select></el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="银行卡号">
                    <el-input/>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">法人信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="法人姓名">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="法人身份证">
                    <el-input/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="身份证到期日">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-form-item label-width="0">
                    <el-checkbox>长期</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">其他信息</div>
        <el-row>
            <el-col :span="8">
                <el-form-item label="邮箱">
                    <el-input/>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="3">
                <el-form-item label="地址">
                    <el-col :span="7">
                        <el-select></el-select>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="title">广告服务条款</div>
        <el-form-item label-width="50px">
            <el-checkbox v-model="checked">我已阅读同意</el-checkbox>
            <span style="color: #38B8EE">《脸云广告-广告主合作协议》</span>
        </el-form-item>
        <el-form-item>
            <div style="margin: 0 auto; width: 300px;">
                <el-button>取消</el-button>
                <el-button>提交审核</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Lakala"
    }
</script>

<style scoped>
    .top-select {
        color: #666666;
        margin-bottom: 30px;
    }

    .business-form {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 6px 4px rgba(242, 242, 242, 1);
        border-radius: 8px;
        padding: 25px;
        box-sizing: border-box;
    }

    .title {
        position: relative;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        padding-left: 30px;
        margin-bottom: 25px;

    }

    .title::before {
        position: absolute;
        content: '';
        left: 0;
        top: 2px;
        width: 9px;
        height: 21px;
        background: linear-gradient(180deg, rgba(255, 42, 0, 1) 0%, rgba(237, 115, 70, 1) 100%);
        border-radius: 5px;
    }
</style>
