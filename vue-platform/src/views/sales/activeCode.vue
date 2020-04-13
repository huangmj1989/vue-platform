<template>
    <div class="activecode_main_wrap container_common">
        <div class="activecode_container">
            <div class="common_query_form_wrap">
                <el-form :inline="true" label-width="120px" :model="queryForm" class="queryForm-form-inline" ref="queryForm">
                    <el-form-item label="选择绑定渠道：" prop="channel">
                        <el-select v-model="queryForm.channel" placeholder="请选择">
                            <el-option  label="一级渠道" value="一级渠道"> </el-option>
                            <el-option  label="二级渠道" value="二级渠道"> </el-option>
                            <el-option  label="三级渠道" value="三级渠道"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="queryBtn_wrap">
                        <el-button type="primary" @click="querySubmitForm('queryForm')">查询</el-button>
                        <el-button @click="resetForm('queryForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="activecode_result_wrap common_result_container">
                <div class="activecode_result_operation common_result_operation">
                    <!-- icon="el-icon-upload2" -->
                    <el-button type="primary" size="mini" @click="datchExport">导出</el-button>
                </div>
                <div class="activecode_result_list common_result_wrap">
                    <el-table :data="activecodeResultList" stripe style="width: 100%">
                        <el-table-column prop="zuming" label="渠道编号" > </el-table-column>
                        <el-table-column prop="userzz" label="渠道名称"> </el-table-column>
                        <el-table-column prop="channelzz" label="渠道等级"> </el-table-column>
                        <el-table-column prop="codezz" label="激活码数量"> </el-table-column>
                        <el-table-column prop="codezz" label="已激活"> </el-table-column>
                        <el-table-column prop="codezz" label="未激活"> </el-table-column>
                        <el-table-column prop="codezz" label="已过期"> </el-table-column>
                        <el-table-column prop="codezz" label="已禁用"> </el-table-column>
                    </el-table>
                    <pagination :pageTotal="300" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from "@/components/pagination";
export default {
    name:'activecode',
    components:{
        Pagination
    },
    data(){
        return{
            queryForm:{
                channel:''
            },
            activecodeResultList:[
                {

                },
            ],//假数据
        }
    },
    created() {
        document.title = this.$route.meta.title;
    },
    mounted() {
        
    },
    methods: {
        // 重置查询条件
        resetForm(formName) {
            console.log('====重置==========',formName,this.$refs[formName])
            this.$refs[formName].resetFields();
        },
        // 查询
        querySubmitForm(formName){
            console.log(this.queryForm,'处理数据-查询')
        },
        // 批量导出
        datchExport(){
            console.log('====piliangdochu批量导出====================')
        },
        // 上下分页
        handleCurrentChange(val){
            // this.incomePayData.page = val;
            // this.getMoneyList()
        },
        // 每页显示多少条
        handleSizeChange(val){
            // this.incomePayData.limit = val;
            // this.getMoneyList()
        },
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
</style>
<style lang="less">
    
</style>