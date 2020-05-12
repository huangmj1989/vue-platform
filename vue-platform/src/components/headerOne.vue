<template>
    <div class="header_main_wrap" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="layout_header_wrap">
            <div class="layout_logo">
                <a href="#/welcome" class="logo_txt">
                    <!-- <img src="../assets/img/lemon02.png" alt=""> -->
                    <span class="logo_title">管理平台</span>
                </a>
            </div>
            <div class="left_open">
                <a href="javascript:void(0);" @click="isOpenAside">
                    <i class="iconfont iconcaidanshouqi" v-show="!menuSlider" title="收起"></i>
                    <i class="iconfont iconcaidanzhankai" v-show="menuSlider" title="展开"></i>
                </a>
            </div>
            <div class="left_index_page">
                <p>
                    <router-link to="/welcome"><i class="iconfont iconMoneymanagement"></i><span> 首页</span></router-link>
                </p>
            </div>
            <div class="layout_user_wrap">
                <ul class="user_wrap">
                    <li class="item">
                        <el-dropdown @command="handleTopCommand">
                            <span class="el-dropdown-link" style="color:#fff;">
                                {{userInfo.j_username}}
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item command="personalMsg">个人信息</el-dropdown-item> -->
                                <el-dropdown-item command="changPwd">修改密码</el-dropdown-item>
                                <!-- <el-dropdown-item command="logout" divided>退出</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);" title="退出" class="logout" @click="logout">
                            <i class="iconfont">&#xe70f;</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 更改系统生成密码 start center @keyup.enter.native="submitCodeForm('changePwdForm')"-->
        <el-dialog title="修改登录密码" :visible.sync="pwdDialogVisible" width="50%" 
        :close-on-press-escape="false" :close-on-click-modal="false" class="changepwd_dialog">
            <p class="tips_dialog" v-if="isUppwd == '1'">当前密码为系统生成密码，为保障账户安全，请修改密码！</p>
            <template >
                <el-form status-icon :model="changePwdForm" :rules="rules" ref="changePwdForm" label-width="0" class="changepwd_form">
                    <el-form-item label="" prop="j_username">
                        <el-input v-model="changePwdForm.j_username" :disabled="true" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="staffPwdOld">
                        <el-input  type="password" v-model="changePwdForm.staffPwdOld" placeholder="请输入原密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="staffPasswd">
                        <el-input  type="password" v-model="changePwdForm.staffPasswd" placeholder="请输入新密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="confirmPwd">
                        <el-input  type="password" v-model="changePwdForm.confirmPwd" placeholder="请再次输入新密码" show-password ></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changePwdForm')">取 消</el-button>
                <el-button type="primary" @click="submitCodeForm('changePwdForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 更改系统生成密码 end-->
    </div>
</template>
<script>
import {sessionStorage} from '@/utils/storage'
import checkTool from '@/utils/check'
import { getRemoteForm} from "@/api.js"
export default {
    name:'headerOne',
    props:{},
    data(){
        var checkPwd  = (rule, value, callback) => {
            if(!checkTool.p_regPwd.test(value)){
               callback(new Error('8-20位，含有大小写字母或数字'));
            }else if(value == this.changePwdForm.staffPwdOld){
                callback(new Error('新密码与原密码不能一致'));
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
                callback(new Error('新密码与原密码不能一致'));
            } else {
                callback();
            }
        };
        return{
            userInfo:{},
            menuSlider:false,
            fullscreenLoading:false,
            pwdDialogVisible:false,//默认不显示修改密码弹出框
            isUppwd:'1',//默认要修改
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
        var info = sessionStorage.getItem("loginInfo").info,key = sessionStorage.getItem("loginInfo").key
        this.userInfo = this.encryption.Decrypt(info,key)
        this.menuSlider = this.$store.state.menuSlider;
        // this.$cookies.get('p_userinfo') ? this.userInfo = this.$cookies.get('p_userinfo') : this.userInfo;
        // console.log('----------------',this.userInfo,sessionStorage.getItem("isUppwd"))
        this.isUppwd = sessionStorage.getItem("isUppwd") ? sessionStorage.getItem("isUppwd") : '1';
        this.changePwdForm.j_username = this.userInfo.j_username;
    },
    mounted() {
        if(sessionStorage.getItem("isUppwd") == '1'){
            this.pwdDialogVisible = true;
        }
    },
    methods: {
        // 头部用户
        handleTopCommand(command){
            // console.log(command,'ffffffffffffff')
            let _this = this;
            if(command == 'logout'){
                _this.logout();
            }else if(command == 'changPwd'){
                // 修改密码
                _this.pwdDialogVisible = true;
            }
        },
        // 左侧菜单是否打开
        isOpenAside(){
            this.menuSlider = !this.menuSlider;
            this.$store.dispatch('commitMenuSlider',this.menuSlider);
            this.$emit("isOpenAside",this.menuSlider)
        },
        // 修改密码弹出框关闭时
        handleClose(done){
            // console.log('=========关闭=======')
        },
        // 确认修改改密码
        submitCodeForm(formName){
            let _this = this;
            _this.fullscreenAllLoading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // _this.loginIn(this.codeForm);
                    // console.log('===============修改密码传参==========',this.changePwdForm)
                    getRemoteForm(_this.changePwdForm,`chnlStaff/pwdupdate`).then(res=>{
                        _this.fullscreenAllLoading = false;
                        // console.log('==========修改返回=================',res);
                        if(res.data.ajaxResult == 0){
                            _this.$message({
                                showClose: true,
                                type: 'error',
                                message: res.data.errorMessage[0].message
                            });
                        }else if(res.data.resultFlag == 'ok'){
                            // _this.$alert('密码修改成功，请重新登录', '提示',{
                            //     confirmButtonText: '确定',
                            //     showClose:false,
                            //     callback: action => {
                            //         // _this.logout();
                            //         _this.$store.dispatch('commitToken',{token:'',type:'2'});
                            //         sessionStorage.clear();
                            //         _this.$router.push({ name: 'login'});
                            //     }
                            // });
                            _this.$confirm('密码修改成功，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                showClose:false,
                                showCancelButton:false,//取消按钮不显示
                                closeOnClickModal:false,//点击遮罩层不关闭
                                closeOnPressEscape:false,//关闭esc
                                type: 'success'
                            }).then(() => {
                                _this.$store.dispatch('commitToken',{token:'',type:'2'});
                                sessionStorage.clear();
                                _this.$router.push({ name: 'login'});
                            }).catch(()=>{

                            });
                        }
                    }).catch(err => {
                        // console.log('===========error=================',err);
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
        // 重置
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.pwdDialogVisible = false;
        },
        // 退出方法
        logout(){
            let _this = this;
            this.$confirm('确定要退出吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal:false,
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true;
                _this.axios({
                    method:"post",
                    url: 'chnlStaff/alogout',
                    headers:{
                        _api_name:'',
                        _api_version:"1.0.0",
                        "Content-Type":"application/x-www-form-urlencoded",
                        "X-Requested-With":"XMLHttpRequest",
                    }
                }).then(res=>{
                    _this.$store.dispatch('commitToken',{token:'',type:'2'});
                    sessionStorage.clear();
                    // _this.$message({
                    //     showClose: true,
                    //     type: 'success',
                    //     message: '已退出，转向登录页!'
                    // });
                    _this.$router.push({ name: 'login'});
                }).catch(error=>{
                    _this.$store.dispatch('commitToken',{token:'',type:'2'});
                    sessionStorage.clear();
                    // _this.$message({
                    //     showClose: true,
                    //     type: 'success',
                    //     message: '已退出，转向登录页!'
                    // });
                    _this.$router.push({ name: 'login'});
                });
                
            }).catch(() => {
                    
            });
        },
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .layout_header_wrap{
        width: 100%;
        height: 60px;
        overflow: hidden;
        background-color: #4e9ec5;
        position: fixed;
        right: 0;
        left: 0;
        z-index: 1001;
        a,a:hover{
            color: #fff;   
        }
        .layout_logo{
            float: left;
            font-size: 18px;
            // padding-left: 20px;
            width: 250px;
            box-sizing: border-box;
            height: 100%;
            line-height: 60px;
            a.logo_txt{
                // margin-top: 9px;
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                span{
                    font-size: 20px;
                    letter-spacing: 6px;
                }
            }
            img{
                height: 32px;
                width: 32px;
                object-fit: contain;
            }
        }
        .left_open{
            height: 100%;
            float: left;
            margin-left: 10px;
            line-height: 60px;
            padding-right: 10px;
            box-sizing: border-box;
            i{
                font-size: 22px;
            }
        }
        .left_index_page{
            height: 100%;
            float: left;
            margin-left: 10px;
            line-height: 60px;
            p>a{
                padding: 5px 10px;
                border: 1px solid #78c2e6;
                font-size: 14px;
                border-radius: 3px;
                background-image: linear-gradient(#4e9ec5, #6ebbe0);
            }
        }
        .layout_user_wrap{
            float: right;
            margin-right: 20px;
            .user_wrap{
                overflow: hidden;
                li.item{
                    float: left;
                    height: 100%;
                    line-height: 60px;
                    margin: 0 10px;
                    font-size: 16px;
                    i{
                        font-size: 20px;
                    }
                    .el-dropdown{
                        color: #fff;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .logout{
                        i{
                            font-weight: bold;
                            font-size: 22px;
                        }
                    }
                }
            }
        } 
    }
    .changepwd_dialog{
        .tips_dialog{
            margin-bottom: 25px;
            color: #f03005;
            text-align: center;
        }
        .changepwd_form{
            width: 45%;
            margin: 0 auto;
        }
    }
</style>
<style lang="less">
    .changepwd_dialog{
        .el-dialog__footer{
            text-align: center !important;
        }
    }
</style>