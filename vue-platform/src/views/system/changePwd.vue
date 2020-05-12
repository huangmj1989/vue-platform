<template>
    <div class="changePwd_main_wrap container_common">
        <div class="changePwd_container_wrap">
           <div class="changePwd_page_wrap">
               <div class="changePwd_box_wrap"
               v-loading="fullscreenAllLoading"
                element-loading-text="努力加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)">
                   <h1 class="changeStyle">
                        <span class="code_login">修改登录密码</span>
                    </h1>
                    <div class="changePwd_form_box">
                        <template >
                            <el-form status-icon :model="changePwdForm" :rules="rules" ref="changePwdForm" label-width="0" class="code_form">
                                <el-form-item label="" prop="j_username">
                                    <el-input v-model="changePwdForm.j_username" placeholder="请输入用户名" @keyup.enter.native="submitCodeForm('changePwdForm')"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="staffPwdOld">
                                    <el-input  type="password" v-model="changePwdForm.staffPwdOld" placeholder="请输入原密码" show-password @keyup.enter.native="submitCodeForm('changePwdForm')"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="staffPasswd">
                                    <el-input  type="password" v-model="changePwdForm.staffPasswd" placeholder="请输入新密码" show-password @keyup.enter.native="submitCodeForm('changePwdForm')"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="confirmPwd">
                                    <el-input  type="password" v-model="changePwdForm.confirmPwd" placeholder="请再次输入新密码" show-password @keyup.enter.native="submitCodeForm('changePwdForm')"></el-input>
                                </el-form-item>
                                <el-form-item class="login_btn_wrap">
                                    <el-button type="primary" @click="submitCodeForm('changePwdForm')">确认修改</el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </div>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
import checkTool from '@/utils/check'
import { getRemoteForm} from "@/api.js"
export default {
    name:'changePwd',
    data(){
        var checkPwd  = (rule, value, callback) => {
            if(!checkTool.p_regPwd.test(value)){
               callback(new Error('8-20位，含有大小写字母或数字'));
            }else if(value == this.changePwdForm.staffPwdOld){
                callback(new Error('新密码不能与原密码一致'));
            }else{
                callback();
            }
        };
        var checkConfigPwd  = (rule, value, callback) => {
            if (value !== this.changePwdForm.staffPasswd) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        var checkPwdOld = (rule, value, callback) => {
            if (value == this.changePwdForm.staffPasswd) {
                callback(new Error('新密码不能与原密码一致'));
            } else {
                callback();
            }
        };
        return{
            fullscreenAllLoading:false,
            changePwdForm:{
                j_username:'',
                staffPasswd:'',
                confirmPwd:'',
                staffPwdOld:''
            },
            rules: {
                j_username: [
                    {required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                staffPasswd: [
                    { required: true,  trigger: 'blur',validator: checkPwd}
                ],
                confirmPwd: [
                    { required: true,  trigger: 'blur',validator: checkConfigPwd}
                ],
                staffPwdOld: [
                    {required: true,  trigger: 'blur',validator: checkPwdOld},
                ],
            },
        }
    },
    created() {
        document.title = this.$route.meta.title;
        let _this = this;
        // console.log(_this.$route.params,'dddddddddddddddd')
        _this.changePwdForm.j_username = _this.$route.params.j_username ? _this.$route.params.j_username : '';
    },
    mounted() {
        
    },
    methods: {
        // 确认修改改密码
        submitCodeForm(formName){
            let _this = this;
            _this.fullscreenAllLoading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // _this.loginIn(this.codeForm);
                    console.log('===============修改密码传参==========',this.changePwdForm)
                    getRemoteForm(_this.changePwdForm,`chnlStaff/pwdupdate`).then(res=>{
                        _this.fullscreenAllLoading = false;
                        console.log('==========修改返回=================',res);
                        if(res.data.ajaxResult == 0){
                            _this.$message({
                                showClose: true,
                                type: 'error',
                                message: res.data.errorMessage[0].message
                            });
                        }else if(res.data.resultFlag == 'ok'){
                            _this.$alert('密码修改成功，请前往登录', '提示',{
                                confirmButtonText: '确定',
                                showClose:false,
                                callback: action => {
                                    _this.$router.push({ name: 'login'});
                                }
                            });
                        }
                    }).catch(err => {
                        console.log('===========error=================',err);
                    });
                } else {
                    // _this.$message({
                    //     showClose: true,
                    //     type: 'error',
                    //     message: '请正确输入相关登录信息！'
                    // });
                    return false;
                }
            });
        },
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .commwandh{
        width: 100%;
        height: 100%;
    }
    .changePwd_main_wrap{
        .commwandh();
        min-width: 1100px;
        background: -webkit-linear-gradient(#0a0e19,#373e51);
        .changePwd_container_wrap{
            .commwandh();
            overflow-y: auto;
            overflow-x: hidden;
            &:before{
                content: '';
                width: 100%;
                height: 100%;
                display: block;
                z-index: -1;
                background: url("../../assets/img/p_big3.jpg");
                background-size: cover;
                -webkit-filter: blur(10px);
                filter: blur(10px);
                z-index: 1;
                position: absolute;
                top: 0;
                right: 0;
            }
            .changePwd_page_wrap{
                width: 998px;
                position: relative;
                margin: 0 auto;
                // box-shadow: 0 5px 25px 5px rgba(23,28,63,.5);
                z-index: 999;
                background-color: #fff;
                border-radius: 3px;
                margin: 120px auto;
                overflow: hidden;
                min-height: 500px;
                .changeStyle{
                    text-align: center;
                    margin: 30px auto;
                    font-size: 20px;
                    font-weight: bold;
                    color: #5a617d;
                    margin-bottom: 80px;
                }
                .changePwd_form_box{
                    width: 40%;
                    margin: 20px auto;
                    text-align: center;
                    .login_btn_wrap{
                        margin-top: 40px;
                    }
                }
            }
            
        }
    }
</style>