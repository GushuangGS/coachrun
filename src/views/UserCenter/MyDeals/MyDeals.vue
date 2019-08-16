<template>
    <div class="my-deals">
        <el-container>
            <el-header height="33px">
                <item-header :status="status" :headerInfo="headerInfo"></item-header>
            </el-header>
        </el-container>
        <div class="content">
            <h2>My Deals</h2>
            <div class="products">
                    <el-row :gutter="20">
                        <el-col :span="8" v-for="(listInfo,index) in dataList" :key="index">
                            <un-available :listInfo="listInfo" v-if="listInfo.ususedDate && listInfo.isExpired==1"></un-available>
                            <available :listInfo="listInfo" v-else=""></available>
                        </el-col>
                    </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import ItemHeader from '@/views/UserCenter/ItemHeader'
    import Available from '@/components/Available'
    import UnAvailable from '@/components/UnAvailable'

    export default{
        name:'MyDeals',
        data(){
            return{
                status: 0,
                headerInfo: [
                    [''],
                    { description: 'My Deals', path: '/app/member/account/deals',title:'My Account' }
                ],
                dataList:[],//优惠卷列表
                isRed:true
            }
        },
        components: {
            ItemHeader,
            Available,
            UnAvailable
        },
        methods:{
            
        },
        created(){
            this.$http.get(this.$api.deals,{website:'1',deviceType:'1',userId:'1571335'})
                .then((res)=>{
                    console.log(res);
                    this.dataList = res.data.data;
                })
        }
    }


</script>

<style scoped>
    .my-deals {
        flex: 1;
    }
    .content{
        padding-left: 40px;
        font-size: 18px;
    }
    
    >>> .el-row{
        display: flex;
        flex-wrap: wrap;
    }
    >>> .el-collapse-item__arrow{
        display: none;
    }
</style>