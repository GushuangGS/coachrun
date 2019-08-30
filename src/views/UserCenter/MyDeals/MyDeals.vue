<template>
    <div class="my-deals">
        <!-- <el-container>
            <el-header height="33px">
                <item-header :status="status" :headerInfo="headerInfo"></item-header>
            </el-header>
        </el-container> -->
        <el-main>
            <div class="content">
                <div class="deals-title">My Deals</div>
                <div class="products">
                        <el-row :gutter="20">
                            <el-col :span="8" v-for="(listInfo,index) in dataList" :key="index">
                                <un-available :listInfo="listInfo" v-if="listInfo.ususedDate && listInfo.isExpired==1"></un-available>
                                <available :listInfo="listInfo" v-else=""></available>
                            </el-col>
                        </el-row>
                </div>
                <div class="none-deals" v-if="dataList.length==0">
                    <img class="none-deals-img" src="@/assets/nodata.png">
                    <div class="none-deals-tips">Sorry, No deals available!</div>
                </div>
            </div>
        </el-main>
    </div>
</template>

<script>
    import ItemHeader from '@/components/ItemHeader'
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
            this.$http.get(this.$api.deals,{headers:{Authorization:`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}},
                            {website:'1',deviceType:'1',userId:'1571335'})
                .then((res)=>{
                    console.log(res);
                    if(res.data.data!=null || res.data.data!=undefined){
                        this.dataList = res.data.data;
                    }else{
                        this.dataList = [];
                    }
                    
                })
        }
    }


</script>

<style scoped>
    .my-deals {
        flex: 1;
    }
    >>> .el-main {
        padding-top: 0;
    }
    .content{
        padding-left: 20px;
        font-size: 18px;
    }
    .deals-title{
        font-size: 18px;
        font-weight: bold;
    }
    >>> .el-row{
        display: flex;
        flex-wrap: wrap;
    }
    >>> .el-collapse-item__arrow{
        display: none;
    }
    .none-deals{
       display: flex;
       align-items: center;
       flex-direction: column;
       margin-top: 50px;
    }
    .none-deals-img{
        width:80px;
        height: auto;
    }
    .none-deals-tips{
        font-size: 16px;
        margin-top: 20px;
    }
</style>