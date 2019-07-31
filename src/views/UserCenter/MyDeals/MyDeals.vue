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
                        <el-col :span="8">
                            <!-- <div class="product-card">
                                <div class="product-top"></div>
                                <div class="product-container">
                                    <div class="product-extra">
                                        <div class="product-tltle1">EXTRA</div>
                                        <div class="product-tltle2">10%</div>
                                        <div class="product-tltle3">OFF</div>
                                    </div>
                                    <div class="product-bus">
                                        <span class="product-intro1">Las Vegas to Los Angeles Bus</span>
                                        <span class="product-intro2">Departure time: 2019-07-04 to 2019-07-12</span>
                                        <span class="product-intro3">Limited 1 Time Offer</span>
                                    </div>
                                    <div class="product-details">
                                            <el-collapse>
                                                <el-collapse-item title="View promotion detail" name="1">
                                                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                                                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                                                </el-collapse-item>
                                            </el-collapse>
                                    </div>
                                </div>
                                <div class="left-ridus"></div>
                                <div class="right-ridus"></div>
                            </div> -->
                            <available></available>
                        </el-col>
                        <el-col :span="8">
                            <un-available></un-available>
                        </el-col>
                        <el-col :span="8">
                            <un-available></un-available>
                        </el-col>
                        <el-col :span="8">
                            <un-available></un-available>
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
                    { description: 'My Deals', path: '/app/member/account/deals' }
                ]
            }
        },
        components: {
            ItemHeader,
            Available,
            UnAvailable
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
    
    /* .product-card{
        width:284px;
        height:253px;
        background:rgba(255,255,255,1);
        box-shadow:2px 4px 12px 0px rgba(51,51,51,0.16);
        margin-bottom: 40px;
        position: relative;
    }
    .left-ridus,.right-ridus{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ffffff;
        position: absolute;
    }
    .left-ridus{
        left: -25px;
        top: 110px;
    }
    .right-ridus{
        left: 268px;
        top: 110px;
    }
    .product-top{
        width:284px;
        height:12px;
        background:rgba(248,76,76,1);
        border-top-left-radius: 5px;
        border-top-right-radius:5px;
    }
    .product-container{
        width: 284px;
        height: 241px;
    }
    .product-extra{
        margin: 0 auto;
        width: 254px;
        height: 121px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-bottom: 2px dashed #E81F4A;
    }
    .product-tltle1{
        width:65px;
        height:20px;
        font-size:18px;
        font-family:Arial-BoldMT;
        font-weight:normal;
        color:rgba(232,31,74,1);
        line-height:21px;
    }
    .product-tltle2{
        width:49px;
        height:27px;
        font-size:24px;
        font-family:Arial-BoldMT;
        font-weight:bold;
        color:rgba(232,31,74,1);
        line-height:28px;
    }
    .product-tltle3{
        width:35px;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(232,31,74,1);
        line-height:25px;
    }
    .product-bus{
        width: 284px;
        height: auto;
    }
    .product-intro1,.product-intro2,.product-intro3{
        padding-left: 8px;
        height:16px;
        font-family:ArialMT;
        color:rgba(51,51,51,1);
        line-height:16px;
        display: block;
    }
    .product-intro1{
        font-size:14px;
        font-weight:bold;
        margin-top: 12px;
    }
    .product-intro2{
        font-size:13px;
        margin-top: 8px;
    }
    .product-intro3{
        margin-top: 8px;
        font-size: 12px;
        color: #365BC3;
        font-weight: bold;
    }
    .product-details{
        padding-left:8px; 
        height:15px;
        font-size:13px;
        color:#2D5687;
        margin-top: 20px;
        line-height:15px;
    }

    >>> .el-collapse{
        border-top: none;
        border-bottom: none;
    }
    >>> .el-collapse-item__header{
        height: 20px;
        line-height: 20px;
        color:#2D5687;
        border-bottom: none;
    } */
</style>