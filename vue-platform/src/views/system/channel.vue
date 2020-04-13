<template>
    <div class="channel_main_wrap container_common"
    v-loading="fullscreenLoading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, .5)">
        <div class="channel_container">
            <div class="channel_tree_wrap">
               <div class="tree_container">
                    <p class="keyword_wrap">
                       <el-input placeholder="输入关键字进行过滤"  v-model="filterText" size="small" > </el-input>
                    </p>
                    <div class="channel_list_wrap">
                        <el-tree class="filter-tree" :data="channelList"
                        :props="defaultProps" :filter-node-method="filterNodeFilter"
                        node-key="id" :expand-on-click-node="false"
                        :check-on-click-node="true"
                        @node-click="handleNodeClick($event,'channel')" :highlight-current="true"
                        ref="channelTree">
                        </el-tree>
                    </div>
               </div>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="channel_right_container">
               <!-- 渠道基础信息 -->
                <div class="channel_base_wrap">
                    <el-form :inline="true" :model="channelBaseMsg" class="basemsg-form-inline" size="small">
                        <el-form-item label="渠道名称：">
                            <el-input v-model="channelBaseMsg.chnlName" placeholder="输入渠道名称" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="号段：">
                            <el-input v-model="channelBaseMsg.paragraphNumber" placeholder="输入号段" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="system_base_wrap">
                    <!-- 渠道激活码信息 -->
                    <div class="activation_main_wrap module_common">
                        <div class="module_header">
                            <span class="module_title">激活码信息</span>
                            <!-- <span class="module_icon" @click="toggleCard"><i class="iconfont iconarrow-up"></i></span> -->
                        </div>
                        <el-collapse-transition>
                        <div class="module_container" v-show="showActiveFlag"> 
                            <!-- 数据区域 -->
                            <!-- 查询区域 -->
                            <div class="module_query_form">
                                <el-form :inline="true" label-width="85px" size="small" :model="activationForm" class="activationForm-form-inline" ref="activationForm">
                                    <!-- :rules="[
                                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                    ]" -->
                                    <el-form-item label="激活码：" prop="activeCode" >
                                        <el-input v-model="activationForm.activeCode" placeholder="输入激活码" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="批次编号：" prop="batchId" >
                                        <el-input v-model="activationForm.batchId" placeholder="输入批次编号" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="序列号：" prop="id">
                                        <el-input v-model="activationForm.id" placeholder="输入序列号" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="产品：" prop="proCode">
                                        <el-select v-model="activationForm.proCode" placeholder="选择产品" clearable>
                                           <el-option v-for="item in productionList" :key="item.proCode" :label="item.proName" :value="item.proCode"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="开始时间：" prop="activeTimeStart">
                                        <!-- <el-date-picker type="date" placeholder="选择日期" v-model="activationForm.start"></el-date-picker> -->
                                        <el-date-picker v-model="activationForm.activeTimeStart" value-format="yyyy-MM-dd hh:mm:ss"
                                        format="yyyy-MM-dd hh:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="结束时间：" prop="activeTimeEnd">
                                        <el-date-picker v-model="activationForm.activeTimeEnd" value-format="yyyy-MM-dd hh:mm:ss"
                                        format="yyyy-MM-dd hh:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="激活状态：" prop="status">
                                        <el-select v-model="activationForm.status" placeholder="选择激活状态" clearable>
                                            <el-option :label="item.spValue" :value="item.spCode"
                                            v-for="(item, index) in statusList" :key="index"></el-option>                                            
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="绑定渠道：" prop="bindChnl" style="position: relative;">
                                        <!-- <el-input style="cursor: pointer;" v-model="activationForm.bindChnlName" placeholder="点击选择绑定渠道" readonly="readonly" @focus="showBatch = !showBatch"></el-input> -->
                                        <!-- <treeselect v-model="activationForm.bindChnl" placeholder="请选择绑定渠道" 
                                        :multiple="false" 
                                        :options="batchChannelList"
                                        @select="changeselecttree" /> -->
                                        <!-- <el-collapse-transition>
                                            <div class="batchChannel_tree_wrap" v-show="showBatch">
                                                <el-tree class="filter-tree" :data="batchChannelList"
                                                :props="defaultProps" node-key="id" :expand-on-click-node="false"
                                                :check-on-click-node="true"
                                                @node-click="handleNodeCheckClick" :highlight-current="true"
                                                ref="channeListlTree">
                                                </el-tree>
                                            </div>
                                        </el-collapse-transition> -->
                                        <el-cascader v-model="activationForm.bindChnl"
                                        :options="batchChannelList" :show-all-levels="false"
                                        :props="{ checkStrictly: true,value:'id',label:'chnlName' }"
                                        clearable @change="getBindChnl"></el-cascader>
                                    </el-form-item>
                                    <el-form-item class="queryBtn_wrap">
                                        <el-button type="primary" plain size="small" class="exportBtn" @click="exportActivationForm('activationForm')" icon="el-icon-upload2">导出</el-button>
                                        <div class="all_msg_show">
                                            <p>
                                                总数量：<span>{{activeCodeList.all ? activeCodeList.all : 0}}</span>，
                                                未使用：<span>{{activeCodeList.unuse ? activeCodeList.unuse : 0}}</span>，
                                                已激活：<span>{{activeCodeList.outdate ? activeCodeList.outdate : 0}}</span>，
                                                禁用：<span>{{activeCodeList.deleted ? activeCodeList.deleted : 0}}</span>
                                            </p>
                                        </div>
                                        <el-button type="primary" size="small" @click="queryActivationForm('activationForm')">查询</el-button>
                                        <el-button size="small" @click="resetForm('activationForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 列表区域 -->
                            <div class="module_result_list">
                                <div class="table_list"
                                v-loading="fullscreenAllLoading"
                                element-loading-text="努力加载中..."
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(255, 255, 255, .5)">
                                    <el-table :data="activeTableList"  stripe style="width: 100%" border>
                                        <el-table-column type="index" label="序号" width="50"> </el-table-column>
                                        <el-table-column prop="id"  label="序列号" > </el-table-column>
                                        <el-table-column prop="batchId" label="批次编号"> </el-table-column>
                                        <el-table-column prop="batchName" label="批次标题"> </el-table-column>
                                        <el-table-column prop="activeCode" label="激活码"> </el-table-column>
                                        <el-table-column prop="proName" label="产品"> </el-table-column>
                                        <el-table-column prop="activeEndtime" label="激活时间" :formatter="formatter"> </el-table-column>
                                        <el-table-column prop="activeStaffCodeName" label="会员昵称"> </el-table-column>
                                        <el-table-column prop="createChnlName" label="生成渠道"> </el-table-column>
                                        <el-table-column prop="bindChnlName" label="绑定渠道"> </el-table-column>
                                        <el-table-column prop="proPrice" label="产品单价"> </el-table-column>
                                        <el-table-column prop="statusName" label="激活状态"> </el-table-column>
                                    </el-table>
                                </div>
                                <div class="pagination_wrap">
                                    <template v-if="activeTotal>0">
                                        <el-pagination style="text-align: right;"
                                        @size-change="activationSizeChange"
                                        @current-change="activationCurrentChange"
                                        :current-page.sync="activationForm.pageNumber"
                                        :page-sizes="[10,15, 20, 25, 50]"
                                        :page-size="activationForm.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="activeTotal"
                                        background>
                                        </el-pagination>
                                    </template>
                                    
                                </div>
                            </div>
                        </div>
                        </el-collapse-transition>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
import { getRemoteJson,getRemoteForm,getProductList,getStatusList,remoteexport} from "@/api.js"
import tools from '@/utils/utils'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
export default {
    name:'channel',
    components: {
        CollapseTransition
    },
    data(){
        return{
            fullscreenLoading:true,
            showActiveFlag:false,//右侧激活码列表区域
            showBatch:false,
            fullscreenAllLoading:false,//显示表格加载
            activeTotal:-1,//激活码总数
            filterText:'',//过滤关键字
            productionList:[],//产品列表
            statusList:[],//状态
            queryForm:{
                id: 'ONLINE',
                catlogId: '',
                catgName: ''
            },
            defaultProps: {//数据格式正对
                label: function(data,node) {
                    return data.chnlName;
                },
                children: 'children',
            },
            channelBaseMsg:{},
            activationForm:{
                createChnl:'',//生成渠道id
                id:'',//序列号
                activeCode:'',//激活码
                batchId:'',//批次编号
                proCode:'',//chanpin
                pageNumber:1,
                pageSize:10,
                bindChnl:"",//绑定渠道
                bindChnlName:'',
                status:"",//状态
                activeTimeStart:'',
                activeTimeEnd:'',
            },
            channelList:[],
            activeTableList:[],//激活码信息
            batchChannelList:[],
            activeCodeList:[],//激活码查询返回数据总数
        }
    },
    created() {
        document.title = this.$route.meta.title;
        let _this = this;
        
        getRemoteForm({},`chnlStaff/getNodes`).then(res=>{
            // console.log('===========渠道树返回数据=========',res)
            this.fullscreenLoading = false;
            if(res.data.flag == '1' && res.status == 200){
                res.data.chnList.forEach((item,index) => {
                    item.children = [];
                    res.data.chnList.forEach((item02,index02) => {
                        if(item02.parentChnl == item.id){
                            item.children.push(item02);
                        }
                    });
                });
                this.channelList  = [];
                this.channelList.push(res.data.chnList[0]);
                this.batchChannelList.push(res.data.chnList[0]);
                this.batchChannelList = this.getTreeData(this.batchChannelList);
                // console.log('===处理之后额数据====',res.data.chnList,this.channelList,this.batchChannelList)
                // 激活码查询条件
                getProductList().then(res=>{
                    if(res.data.flag == '1') _this.productionList = res.data.list ? res.data.list : [];
                });
                getStatusList().then(res=>{
                    if(res.data.flag == '1') _this.statusList = res.data.list ? res.data.list : [];
                });
            }
            // else if(res.data.ajaxResult == 3 && res.data.errorMessage.length > 0){
            //     if(res.data.errorMessage[0].code == 'webcore.000003'){
            //         _this.$confirm(res.data.errorMessage[0].message, '提示', {
            //             confirmButtonText: '确定',
            //             // cancelButtonText: '取消',
            //             type: 'warning',
            //             showClose:false,
            //             showCancelButton:false,
            //             closeOnClickModal:false,
            //             closeOnPressEscape:false,
            //         }).then(() => {
            //             sessionStorage.clear();
            //             _this.$router.push({ name: 'login'});
            //         }).catch(() => {
                            
            //         });
            //     }else{
            //         _this.$message({
            //             showClose: true,
            //             type: 'error',
            //             message: res.data.errorMessage[0].message
            //         });
            //     }
            // }
            else{
                _this.$message({
                    showClose: true,
                    type: 'error',
                    message: '获取数据失败，请刷新页面或联系运维人员！'
                });
            }
        }).catch(err => {
            // console.log(err,'=====穿线错误==========')
        });
        

    },
    mounted() {
        
    },
    methods: {
        getBindChnl(item){
            // console.log('=======================选中及诶单的值===============',item)
            this.activationForm.bindChnl = item ? item[item.length-1] : '';
        },
        filterNodeFilter(value, data) {
            if (!value) return true;
            return data.chnlName.indexOf(value) !== -1;
        },
        handleNodeClick(data,type){
            let _this = this;
            this.showActiveFlag= true;
            this.activationForm.createChnl = data.id;
            this.fullscreenAllLoading = true;
            // console.log('-------------------点击树节点---------------',data,type);
            getRemoteForm({id:data.id},`chnlStaff/getOneNode`).then(res=>{
                // console.log('===========渠道树点击查询返回数据=========',res)
                if(res.data.flag == '1'){
                    _this.channelBaseMsg = res.data.respDTO;
                    // 查询激活码列表
                    this.getActiveList();
                }else{

                }
            });
        },
        handleNodeCheckClick(data){
            // console.log('-------------------点击5555树节点---------------',data);
            this.activationForm.bindChnl = data.id;
            this.activationForm.bindChnlName = data.chnlName;
            this.showBatch = !this.showBatch;
        },
        getActiveList(){
            let _this = this;
            this.fullscreenAllLoading = true;
            getRemoteForm(this.activationForm,`chnlStaff/activeCode`).then(res=>{
                // console.log('===========渠道树点击查询激活码返回数据=========',res)
                this.fullscreenAllLoading = false;
                if(res.status == 200 && res.data.flag == '1'){
                    if(res.data.page.count > 0){
                        _this.activeTableList = res.data.page.result;
                        _this.activeTotal = res.data.page.count;
                        this.activeCodeList = res.data.countNum;
                    }else{
                        _this.activeTableList = [];
                        _this.activeTotal = 0;
                    }
                }
            }).catch(err =>{
                _this.$message({
                    showClose: true,
                    type: 'error',
                    message: '获取数据失败，请刷新页面或联系运维人员！'
                });
            });
        },
        // 时间格式化
        formatter(row, column){
            return tools.getFormatTime(row.activeEndtime)
        },
        // 查询
        queryActivationForm(formName){
            // console.log(this.activationForm,'dddddddddddddddddd')
            this.getActiveList();
        },
        // 导出
        exportActivationForm(formName){
            remoteexport(this.activationForm)
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
        changeselecttree(item,type){
            // console.log('=============',item,type)
            // this.accurateSearchArr.push({
            //     type:'areas',
            //     value:'地域分布:'+item.value,
            // });
            // this.accurateSearchArr = uniqueCommonArr(this.accurateSearchArr,'areas');
        },
        // handleSizeChange
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        },
        // handleSizeChange
        activationSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.activationForm.pageSize = val;
            this.getActiveList();
        },
        activationCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.activationForm.pageNumber = val;
            this.getActiveList();
        },
        // handleSizeChange
        membershipSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        membershipCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        },
        // 收起展开
        toggleCard(event){
            // $(event.target).parents('.module_header').next('.module_container').toggle();
            // if($(event.target).parents('.module_header').find('i.iconfont').hasClass('iconarrow-up')){
            //     $(event.target).parents('.module_header').find('i.iconfont').removeClass('iconarrow-up').addClass('iconarrow-down');
            // }else{
            //     $(event.target).parents('.module_header').find('i.iconfont').removeClass('iconarrow-down').addClass('iconarrow-up');
            // }
        },
        // 重置查询条件
        resetForm(formName) {
            // console.log(formName,'fffffff重置fffffff')
            this.$refs[formName].resetFields();
        },
        // 递归方法
        getTreeData(data){
            // 循环遍历json数据
            for(var i=0;i<data.length;i++){
                
                if(data[i].children.length<1){
                    // children若为空数组，则将children设为undefined
                    data[i].children=undefined;
                }else {
                    // children若不为空数组，则继续 递归调用 本方法
                    this.getTreeData(data[i].children);
                }
            }
            return data;
        },
    },
    watch: {
        filterText(val) {
            this.$refs.channelTree.filter(val);
        }
    },
}
</script>
<style lang="less" scoped>
    .channel_container{
        overflow: hidden;
        position: relative;
        .commlandr{
            float: left;
            width: 240px;
        }
        .channel_tree_wrap{
            .commlandr();
            // border-right: 1px solid #d2d0d0;
            padding: 20px 0;
            // padding-right: 10px;
            .tree_container{
                .keyword_wrap{

                }
                .channel_list_wrap{
                    margin-top: 20px;
                }
            }
        }
        .channel_right_container{
            // border-left: 1px solid #d2d0d0;
            border-left: 1px solid #DCDFE6;
            padding-left: 10px;
            box-sizing: border-box;
            .commlandr();
            width: calc(100% - 250px);
            float: right;
            .channel_base_wrap{
                margin-top: 20px;
                margin-left: 50px;
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
                // display: none;
                padding: 20px 10px;
                box-sizing: border-box;
                // height: 0;
                // opacity: 0;
                // transition: height  2s  ease  0s;
            }
            .queryBtn_wrap{
                display: block;
                text-align: right;
                margin-top: 20px;
                .el-form-item__content{
                    display: block;
                }
                .exportBtn{

                }
                .all_msg_show{
                    display: inline-block;
                    float: left;
                    margin-left: 20px;
                    background-color: #f7cbcb;
                    color: #ff0000;
                    padding: 0 10px;
                    font-weight: bold;
                }
            }
            .module_common{
                margin: 20px 0;
                // border: 1px solid #4e9ec5;
            }
            .module_query_form{
                margin-bottom: 20px;
            }
            .pagination_wrap{
                margin: 20px 0;
            }
            
        }
        .batchChannel_tree_wrap{
            position: absolute;
            width: 100%;
            height: auto;
            z-index: 66;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            border: 1px solid #E4E7ED;
            border-radius: 4px;
            overflow: hidden;
        }
    }
</style>
<style lang="less">
    .system_base_wrap .el-table .el-table__header-wrapper thead tr th{
        background-color:#f9f9f9;
        padding: 6px 0;
    }
    .module_query_form .el-form input{
        width: 185px !important;
    }
    .module_query_form .el-date-editor.el-input,
    .module_query_form .el-date-editor.el-input__inner{
        width: initial;
    }
    .batchChannel_tree_wrap .el-tree{

    }
    .el-tree-node{
        white-space: normal !important;
    }
    .el-tree .el-tree-node__content{
        min-height: 26px;
        height: auto !important;
        line-height: 20px;
    }
    .is-leaf.el-icon-caret-right:before{
        content: ' ';
        position: absolute;
        right: 0px;
        top: 3px;
        width: 4px;
        height: 4px;
        background-color: #c0c5cc;
        border-radius: 50%;
    }
    .el-tree-node__expand-icon.is-leaf{
        margin-right: 12px;
    }
    .el-tree .el-tree-node.is-current > .el-tree-node__content span.el-tree-node__label{
        color: #00abff;
    }
    .queryBtn_wrap{
        .el-form-item__content{
            display: block;
        }
        .exportBtn{
            float: left;
        }
    }
    .channel_container .el-divider--vertical{
        min-height: 350px;
        position: absolute;
        left: 242px;
        background-color: inherit;
        border-left: 1px solid #DCDFE6;
    }
</style>