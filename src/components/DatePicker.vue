<template>
        <el-date-picker
            v-model="value"
            size="large"
            type="daterange"
            :editable="false"
            align="left"
            unlink-panels
            range-separator="to"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            @change="selectOrder"
            :default-value="timeDefaultShow"
            :picker-options="pickerOptions2">
        </el-date-picker>
</template>

<script>
    import moment from "moment"
    export default {
        name:'datePicker',
        props:['userID','api'],
        data() {
            return {
                value: [moment().subtract(30, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
                timeDefaultShow:'',
                pickerOptions2: {
                    disabledDate(time){
                        return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
                    },
                    shortcuts: [
                    {text: 'Today',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        picker.$emit('pick', [end, end]);
                    }}, 
                    {text: 'Yesterday',
                    onClick(picker) {
                        const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [end, end]);
                    }},
                    {text: 'Yesterday & Today',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'This Week (Sun - Today)',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().day(0).format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'This Week (Mon - Today)',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD')
                        const start = moment().day(1).format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last 7 days',
                    onClick(picker) {
                        const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Today & Last 7 days',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last Week (Sun - Sat)',
                    onClick(picker) {
                        const end = moment().weekday(-1).format('YYYY-MM-DD');
                        const start = moment().weekday(-7).format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last Week (Mon - Sun)',
                    onClick(picker) {
                        const end = moment().weekday(0).format('YYYY-MM-DD');
                        const start = moment().weekday(-6).format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last 14 days',
                    onClick(picker) {
                        const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        const start = moment().subtract(14, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Today & Last 14 days',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().subtract(14, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'This Month',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().add('month', 0).format('YYYY-MM') + '-01';
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last Month',
                    onClick(picker) {
                        const start = moment().subtract('month', 1).format('YYYY-MM') + '-01';
                        const end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last 30 days',
                    onClick(picker) {
                        const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        const start = moment().subtract(30, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Today & Last 30 days',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().subtract(30, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last 90 days',
                    onClick(picker) {
                        const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        const start = moment().subtract(90, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Today & Last 90 days',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().subtract(90, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Last 180 days',
                    onClick(picker) {
                        const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                        const start = moment().subtract(180, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }},
                    {text: 'Today & Last 180 days',
                    onClick(picker) {
                        const end = moment().format('YYYY-MM-DD');
                        const start = moment().subtract(180, 'days').format('YYYY-MM-DD');
                        picker.$emit('pick', [start, end]);
                    }}]
                    },
            };
        },
        mounted(){
            this.timeDefaultShow = new Date();
            this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
        },
        methods:{
            selectOrder(time){
                if(time!=null && this.api!=undefined && this.userID!=undefined){
                    this.$http.get(this.api,
                    {params:{dateRange:1,startDate:time[0],endDate:time[1],userId:this.userID}})
                            .then((res)=>{
                                console.log(res);
                                if(res.data.code == 200){
                                    if(res.data.data!=null || res.data.data!=undefined){
                                        this.$emit('changeDate', res.data.data);
                                    }else{
                                        this.$emit('changeDate', '');
                                    } 
                                }
                            })
                }else{
                    this.$emit('changeDate', '');
                }
            },
        }
    };
    </script>
    <style>
        .el-select-dropdown__item{
            color: #333333;
        }
        .el-range-editor--small .el-range-input{
            font-size: 14px;
        }
        .el-date-editor .el-range-input{
            color: #333333;
        }
        .el-date-editor .el-range-input::-webkit-input-placeholder { /* WebKit browsers */
            color: #333333;
        }
        .el-date-range-picker.has-sidebar{
            width: 896px;
        }
        .el-picker-panel__sidebar{
            width: 195px;
        }
        .el-picker-panel__sidebar+.el-picker-panel__body{
            margin-left: 195px;
        }
    </style>