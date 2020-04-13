<template>
    <div class="growth_main_wrap container_common">
        <div class="growth_container">
            <div class="common_query_form_wrap">
                <el-form :inline="true" label-width="190px" :model="queryForm" class="queryForm-form-inline" ref="queryForm">
                    <el-form-item label="请选择A组数据的时间范围：" prop="start01">
                        <el-date-picker v-model="queryForm.start01" type="daterange" align="right"
                            unlink-panels range-separator="至" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="请选择B组数据的时间范围：" prop="start02">
                        <el-date-picker v-model="queryForm.start02" type="daterange" align="right"
                            unlink-panels range-separator="至" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="queryBtn_wrap">
                        <el-button type="primary" @click="querySubmitForm('queryForm')">查询</el-button>
                        <el-button @click="resetForm('queryForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="growth_result_wrap common_result_container">
                <div class="growth_result_operation common_result_operation">
                    <!-- icon="el-icon-upload2" -->
                    <el-button type="primary" size="mini" @click="datchExport">批量导出</el-button>
                </div>
                <div class="growth_result_list common_result_wrap">
                    <el-table :data="growthResultList" stripe style="width: 100%">
                        <el-table-column prop="zuming" label="组名" > </el-table-column>
                        <el-table-column prop="userzz" label="会员增长数量"> </el-table-column>
                        <el-table-column prop="channelzz" label="渠道增长数量"> </el-table-column>
                        <el-table-column prop="codezz" label="激活码增长数量"> </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'growth',
    data(){
        return{
            queryForm:{
                start01:'',
                end01:'',
                start02:'',
                end02:'',
                
            },
            growthResultList:[
                {
                   zuming:'A组',
                   userzz:'122',
                   channelzz:'22',
                   codezz:'2',
                },
                {
                   zuming:'B组',
                   userzz:'1232',
                   channelzz:'232',
                   codezz:'3',
                },
            ],//列表数据模拟
            pickerOptions: {
                shortcuts: [{
                    text: '本月',
                    onClick(picker) {
                        picker.$emit('pick', [new Date(), new Date()]);
                    }
                }, {
                    text: '今年至今',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date(new Date().getFullYear(), 0);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近六个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setMonth(start.getMonth() - 6);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
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
    },
    watch: {
        
    },
}
</script>
<style lang="less" scoped>
    .growth_result_list{
        
    }
</style>
<style lang="less">
    
</style>