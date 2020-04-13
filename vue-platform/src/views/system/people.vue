<template>
    <div class="channel_main_wrap container_common">
        <div class="channel_container">
            <div class="channel_tree_wrap">
               <div class="tree_container">
                    <p class="keyword_wrap">
                       <el-input placeholder="输入关键字进行过滤"  v-model="filterText"> </el-input>
                    </p>
                    <!--  node-key="id" lazy :load="getNodes"  :expand-on-click-node="false"
                        :check-on-click-node="true"
                        @node-click="handleNodeClick($event,'channel')" :highlight-current="true" -->
                    <div class="channel_list_wrap">
                        <el-tree class="filter-tree" :data="channelList"
                        :props="defaultProps" :filter-node-method="filterNodeFilter"
                        node-key="id" lazy :load="getNodes"  :expand-on-click-node="false"
                        :check-on-click-node="true"
                        @node-click="handleNodeClick($event,'channel')" :highlight-current="true"
                        ref="channelTree">
                        </el-tree>
                    </div>
               </div>
            </div>
            <div class="channel_right_container">
               <!-- 渠道基础信息 -->
                <div class="channel_base_wrap">
                    <el-form :inline="true" :model="channelBaseMsg" class="basemsg-form-inline">
                        <el-form-item label="渠道名称：">
                            <el-input v-model="channelBaseMsg.chnlName" placeholder="输入渠道名称"></el-input>
                        </el-form-item>
                        <el-form-item label="号段：">
                            <el-input v-model="channelBaseMsg.paragraphNumber" placeholder="输入号段"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="system_base_wrap">
                    <!--渠道批次信息 -->
                    <div class="batch_main_wrap module_common">
                        <div class="module_header">
                            <span class="module_title">批次信息</span>
                            <span class="module_icon" @click="toggleCard"><i class="iconfont iconarrow-up"></i></span>
                        </div>
                        <div class="module_container">
                            <!-- 数据区域 -->
                            <!-- 查询区域 -->
                            <div class="module_query_form">
                                <el-form :inline="true" label-width="150px" :model="batchForm" class="batchForm-form-inline" ref="batchForm">
                                    <!-- :rules="[
                                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]" -->
                                    <el-form-item label="批次编号：" prop="chnlName" >
                                        <el-input v-model="batchForm.chnlName" placeholder="输入批次编号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="批次标题：">
                                        <el-input v-model="batchForm.paragraphNumber" placeholder="输入批次标题"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属产品：">
                                        <el-input v-model="batchForm.paragraphNumber" placeholder="输入所属产品"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属渠道：">
                                        <el-input v-model="batchForm.paragraphNumber" placeholder="输入所属渠道"></el-input>
                                    </el-form-item>
                                    <el-form-item label="激活截止时间(开始)：">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="batchForm.start"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="激活截止时间(截止)：">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="batchForm.end"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="批次状态：">
                                        <el-select v-model="batchForm.status" placeholder="选择批次状态">
                                            <el-option label="有效" value="ok"></el-option>
                                            <el-option label="失效" value="no"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item  class="queryBtn_wrap">
                                        <el-button type="primary" @click="queryBatchForm('batchForm')">查询</el-button>
                                        <el-button @click="resetForm('batchForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 列表区域 -->
                            <div class="module_result_list">
                                <div class="table_list">
                                    <el-table :data="batchTableList"  stripe style="width: 100%" border>
                                        <el-table-column prop="id"  label="批次编号"> </el-table-column>
                                        <el-table-column prop="batchName"  label="批次标题" > </el-table-column>
                                        <el-table-column prop="proName" label="所属产品"> </el-table-column>
                                        <el-table-column prop="topChnlName" label="一级渠道"> </el-table-column>
                                        <el-table-column prop="statusName" label="批次状态"> </el-table-column>
                                    </el-table>
                                </div>
                                <div class="pagination_wrap">
                                    <el-pagination style="text-align: right;"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="batchForm.pageNumber"
                                    :page-sizes="[10,15, 20, 25, 50]"
                                    :page-size="batchForm.pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400"
                                    background>
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 渠道激活码信息 -->
                    <div class="activation_main_wrap module_common">
                        <div class="module_header">
                            <span class="module_title">激活码信息</span>
                            <span class="module_icon" @click="toggleCard"><i class="iconfont iconarrow-up"></i></span>
                        </div>
                        <div class="module_container">
                            <!-- 数据区域 -->
                            <!-- 查询区域 -->
                            <div class="module_query_form">
                                <el-form :inline="true" label-width="150px" :model="activationForm" class="activationForm-form-inline" ref="activationForm">
                                    <!-- :rules="[
                                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]" -->
                                    <el-form-item label="序列号：" prop="chnlName" >
                                        <el-input v-model="activationForm.chnlName" placeholder="输入序列号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="激活码：">
                                        <el-input v-model="activationForm.paragraphNumber" placeholder="输入激活码"></el-input>
                                    </el-form-item>
                                    <el-form-item label="批次标题：">
                                        <el-input v-model="activationForm.paragraphNumber" placeholder="输入批次标题"></el-input>
                                    </el-form-item>
                                    <el-form-item label="产品：">
                                        <el-select v-model="activationForm.status" placeholder="选择产品">
                                            <el-option label="有效" value="ok"></el-option>
                                            <el-option label="失效" value="no"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="渠道：">
                                        <el-input v-model="activationForm.paragraphNumber" placeholder="输入渠道"></el-input>
                                    </el-form-item>
                                    <el-form-item label="激活截止时间(开始)：">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="activationForm.start"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="激活截止时间(截止)：">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="activationForm.end"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="激活账号：">
                                        <el-input v-model="activationForm.paragraphNumber" placeholder="输入激活账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="激活时间(开始)：">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="activationForm.start"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="激活时间(截止)：">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="activationForm.end"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="激活状态：">
                                        <el-select v-model="activationForm.status" placeholder="选择激活状态">
                                            <el-option label="有效" value="ok"></el-option>
                                            <el-option label="失效" value="no"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="queryBtn_wrap">
                                        <el-button type="primary" @click="queryActivationForm('activationForm')">查询</el-button>
                                        <el-button @click="resetForm('activationForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 列表区域 -->
                            <div class="module_result_list">
                                <div class="table_list">
                                    <el-table :data="batchTableList"  stripe style="width: 100%" border>
                                        <el-table-column prop="id"  label="批次编号"> </el-table-column>
                                        <el-table-column prop="batchName"  label="批次标题" > </el-table-column>
                                        <el-table-column prop="proName" label="所属产品"> </el-table-column>
                                        <el-table-column prop="topChnlName" label="一级渠道"> </el-table-column>
                                        <el-table-column prop="statusName" label="批次状态"> </el-table-column>
                                    </el-table>
                                </div>
                                <div class="pagination_wrap">
                                    <el-pagination style="text-align: right;"
                                    @size-change="activationSizeChange"
                                    @current-change="activationCurrentChange"
                                    :current-page.sync="activationForm.pageNumber"
                                    :page-sizes="[10,15, 20, 25, 50]"
                                    :page-size="activationForm.pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400"
                                    background>
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 会员关系信息 -->
                    <div class="membership_main_wrap module_common">
                        <div class="module_header">
                            <span class="module_title">会员关系（用户第一次成为VIP）</span>
                            <span class="module_icon" @click="toggleCard"><i class="iconfont iconarrow-up"></i></span>
                        </div>
                        <div class="module_container">
                            <!-- 数据区域 -->
                            <!-- 查询区域 -->
                            <div class="module_query_form">
                                <el-form :inline="true" label-width="150px" :model="membershipForm" class="membershipForm-form-inline" ref="membershipForm">
                                    <!-- :rules="[
                                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]" -->
                                    <el-form-item label="用户账号：" prop="chnlName" >
                                        <el-input v-model="membershipForm.chnlName" placeholder="输入用户账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户昵称：">
                                        <el-input v-model="membershipForm.paragraphNumber" placeholder="输入用户昵称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户姓名：">
                                        <el-input v-model="membershipForm.paragraphNumber" placeholder="输入用户姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属渠道：">
                                        <el-input v-model="membershipForm.paragraphNumber" placeholder="点击选择所属渠道"></el-input>
                                    </el-form-item>
                                    
                                    <el-form-item class="queryBtn_wrap">
                                        <el-button type="primary" @click="queryMembershipForm('membershipForm')">查询</el-button>
                                        <el-button @click="resetForm('membershipForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 列表区域 -->
                            <div class="module_result_list">
                                <div class="table_list">
                                    <el-table :data="batchTableList"  stripe style="width: 100%" border>
                                        <el-table-column prop="id"  label="批次编号"> </el-table-column>
                                        <el-table-column prop="batchName"  label="批次标题" > </el-table-column>
                                        <el-table-column prop="proName" label="所属产品"> </el-table-column>
                                        <el-table-column prop="topChnlName" label="一级渠道"> </el-table-column>
                                        <el-table-column prop="statusName" label="批次状态"> </el-table-column>
                                    </el-table>
                                </div>
                                <div class="pagination_wrap">
                                    <el-pagination style="text-align: right;"
                                    @size-change="membershipSizeChange"
                                    @current-change="membershipCurrentChange"
                                    :current-page.sync="membershipForm.pageNumber"
                                    :page-sizes="[10,15, 20, 25, 50]"
                                    :page-size="membershipForm.pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400"
                                    background>
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
import { getRemoteJson,getRemoteForm} from "@/api.js"
export default {
    name:'channel',
    data(){
        return{
            filterText:'',//过滤关键字
            queryForm:{
                id: 'ONLINE',
                catlogId: '',
                catgName: ''
            },
            defaultProps: {//数据格式正对
                label: 'name',
            },

            channelBaseMsg:{
                chnlName:'测试数据-渠道名称',
                paragraphNumber:'测试号段-ww21'
            },
            batchForm:{
                chnlName:'',
                paragraphNumber:'',
                end:'',
                start:'',
                status:'',
                pageNumber:1,
                pageSize:10,
                sortname:"id",
                sortorder:"asc"

            },//批次查询信息
            activationForm:{
                chnlName:'',
                paragraphNumber:'',
                end:'',
                start:'',
                status:'',
                pageNumber:1,
                pageSize:10,
                sortname:"id",
                sortorder:"asc"

            },
            membershipForm:{
                chnlName:'',
                paragraphNumber:'',
                end:'',
                start:'',
                status:'',
                pageNumber:1,
                pageSize:10,
                sortname:"id",
                sortorder:"asc"

            },
            batchTableList:[
                {
                    batchName: "1234-",
                    proCode: 1033,
                    updateTime: 1585705196000,
                    createChnl: 1015,
                    codeNumber: 3,
                    createChnlName: "一级线下渠道33",
                    createStaff: 1000,
                    topChnlName: "一级线下渠道33",
                    updateStaffName: "admin",
                    createStaffName: "admin",
                    createTime: 1585705196000,
                    activeEndtime: 1585748390000,
                    statusName: "有效",
                    id: 100034,
                    proName: "1234",
                    status: "1",
                    topChnl: 1015,
                    updateStaff: 1000,
                },
                {
                    batchName: "批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题批次标题",
                    proCode: 1013,
                    updateTime: 1585151688000,
                    createChnl: 1025,
                    codeNumber: 1111111111111111,
                    createChnlName: "二级线下渠道",
                    createStaff: 1000,
                    topChnlName: "一级线下渠道99",
                    updateStaffName: "admin",
                    createStaffName: "admin",
                    createTime: 1585060918000,
                    activeEndtime: 1585060870000,
                    statusName: "无效",
                    id: 100025,
                    proName: "12",
                    status: "0",
                    topChnl: 1024,
                    updateStaff: 1000,
                }
            ],
            channelList:[
                {
                    chkDisabled: false,
                    click: true,
                    id: "ONLINE",
                    isParent: true,
                    isRoot: true,
                    name: "线上渠道",
                    open: true,
                    children:[],
                },
                {
                    chkDisabled: false,
                    click: true,
                    id: "OFFLINE",
                    isParent: true,
                    isRoot: true,
                    name: "线下渠道",
                    open: true,
                    children:[],
                }
            ],
            onlineList:[
                {
                    chkDisabled: false,
                    click: true,
                    id: "1012",
                    isParent: false,
                    isRoot: false,
                    name: "人卫临床助手",
                    open: true,
                    pId: "ONLINE",
                },
                {
                    chkDisabled: false,
                    click: true,
                    id: "1026",
                    isParent: false,
                    isRoot: false,
                    name: "人卫中医助手",
                    open: true,
                    pId: "ONLINE",
                },{
                    chkDisabled: false,
                    click: true,
                    id: "1027",
                    isParent: false,
                    isRoot: false,
                    name: "线上2渠道",
                    open: true,
                    pId: "ONLINE",
                }
            ],
            offList:[
                {
                    chkDisabled: false,
                    click: true,
                    id: "1013",
                    isParent: true,
                    isRoot: false,
                    name: "一级线下渠道",
                    open: true,
                    pId: "OFFLINE",
                },
                {
                    chkDisabled: false,
                    click: true,
                    id: "1016",
                    isParent: false,
                    isRoot: false,
                    name: "一级线下渠道4",
                    open: true,
                    pId: "OFFLINE",
                }
            ],
        }
    },
    created() {
        document.title = this.$route.meta.title;

        getRemoteForm('','chnlStaff/getNodes').then(res=>{
            console.log('=============渠道树返回数据================',res);
            // if(res.data.values.resultFlag == 'ok'){
            //     this.$confirm('密码更改成功，确定重新登录吗？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         _this.$store.dispatch('commitToken',{token:'',type:'2'});
            //         _this.$cookies.remove('j_userinfo');
            //         _this.$message({
            //             showClose: true,
            //             type: 'success',
            //             message: '请重新登录！'
            //         });
            //         _this.$router.push({ name: 'login'}); 
            //     }).catch(() => {
            //         this.changePwdVisible = false;
            //     });
            // }else if(res.data.values.resultFlag == 'expt'){
            //     _this.$message({
            //         showClose: true,
            //         type: 'error',
            //         message: '原密码错误，请重新输入！'
            //     });
            // }else{
            //     _this.$message({
            //         showClose: true,
            //         type: 'error',
            //         message: '密码更改失败，请稍后再试！'
            //     });
            // }
        }).catch(error=>{
            _this.$message({
                showClose: true,
                type: 'error',
                message: '密码更改失败，请稍后再试！'
            });
        });

    },
    mounted() {
        
    },
    methods: {
        filterNodeFilter(value, data) {
            console.log('ddddddddddddddddddddd',value, data)
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        handleNodeClick(data,type){
            console.log('-------------------点击树节点---------------',data,type);
            this.queryForm.id = data.id;
        },
        // 加载
        getNodes(node,resolve){
            let _this = this;
            // console.log(node,resolve,'====lazy========数据')
            if (node.level === 0) {//首次加载
                return resolve(_this.channelList);
            }else{
                if(node.data.isParent){
                    if(node.data.id == "OFFLINE"){
                        return resolve(_this.offList);
                    }else if(node.data.id == "ONLINE"){
                        return resolve(_this.onlineList);
                    }else{
                        return resolve(_this.onlineList);
                    }
                }else{
                    return resolve([]);
                }
            }
        },
        // handleSizeChange
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // handleSizeChange
        activationSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        activationCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // handleSizeChange
        membershipSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        membershipCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 收起展开
        toggleCard(event){
            $(event.target).parents('.module_header').next('.module_container').toggle();
            if($(event.target).parents('.module_header').find('i.iconfont').hasClass('iconarrow-up')){
                $(event.target).parents('.module_header').find('i.iconfont').removeClass('iconarrow-up').addClass('iconarrow-down');
            }else{
                $(event.target).parents('.module_header').find('i.iconfont').removeClass('iconarrow-down').addClass('iconarrow-up');
            }
            
        },
        // 重置查询条件
        resetForm(formName) {
            console.log(formName,'fffffff重置fffffff')
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        filterText(val) {
            console.log(this.$refs.channelTree,val,'dddddddddddd')
            this.$refs.channelTree.filter(val);
        }
    },
}
</script>
<style lang="less" scoped>
    .channel_container{
        overflow: hidden;
        .commlandr{
            float: left;
            width: 240px;
        }
        .channel_tree_wrap{
            .commlandr();
            padding: 20px 0;
            .tree_container{
                .keyword_wrap{

                }
                .channel_list_wrap{
                    margin-top: 20px;
                }
            }
        }
        .channel_right_container{
            .commlandr();
            width: calc(100% - 250px);
            float: right;
            .channel_base_wrap{
                margin-top: 20px;
            }
        }
        .system_base_wrap{
            .module_header{
                height: 38px;
                background-color: #4e9ec5;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                line-height: 38px;
                padding: 0 20px;
                box-sizing: border-box;
                i.iconfont{
                    font-size: 22px;
                    cursor: pointer;
                }
                span.module_icon{
                    float: right;
                    cursor: pointer;
                }
            }
            .module_container{
                padding: 20px;
                box-sizing: border-box;
            }
            .queryBtn_wrap{
                display: block;
                text-align: right;
            }
            .module_common{
                margin: 20px 0;
                border: 1px solid #4e9ec5;
            }
            .module_query_form{
                margin-bottom: 20px;
            }
            .pagination_wrap{
                margin: 20px 0;
            }
            
        }
    }
</style>
<style lang="less">
    .system_base_wrap .el-table .el-table__header-wrapper thead tr th{
        background-color:#eee;
    }
    .module_query_form .el-form input{
        width: 220px !important;
    }
</style>