<template>
    <div class="product-card">
        <div class="product-top"></div>
        <div class="product-container">
            <div class="product-extra">
                <div class="product-tltle1" v-show="listInfo.calculateType ==1">EXTRA</div>
                <div class="product-tltle2">{{discountValue}}</div>
                <div class="product-tltle3">OFF</div>
            </div>
            <div class="product-bus">
                <span class="product-intro1">{{listInfo.title}}</span>
                <span class="product-intro2" v-if="listInfo.purchaseDateDescription">
                    <span>Purchase date: </span>
                    <el-tooltip :content="listInfo.purchaseDateDescription" effect="light" placement="top-start">
                        <span>{{listInfo.purchaseDateDescription}}</span>
                    </el-tooltip>
                </span>
                <span class="product-intro2" v-if="listInfo.serviceDateDescription">
                        <span>Service date: </span>
                        <el-tooltip :content="listInfo.serviceDateDescription" effect="light" placement="top-start">
                            <span>{{listInfo.serviceDateDescription}}</span>
                        </el-tooltip>
                    </span>
                <span class="product-intro3" v-show="listInfo.oneTimeUse ==true">Limited one time offer</span>
                <span class="product-intro4">Applicable device: {{useType(listInfo)}}</span>
            </div>
            <div class="product-details">
                    <el-collapse>
                        <el-collapse-item>
                                <template slot="title">
                                     View promotion details
                                     <img class="down" src="@/assets/down.png" alt=""> 
                                </template>
                            <!-- <div class="infiDes" v-html="getDescription(listInfo.description)"></div> -->
                            <div class="infiDes" v-html="listInfo.description"></div>
                            <div v-for="(item,index) in listInfo.products" :key="index">
                                {{item.name}}
                            </div>
                        </el-collapse-item>
                    </el-collapse>
            </div>
        </div>
        <!-- <div class="left-ridus"></div>
        <div class="right-ridus"></div> -->
    </div>
</template>

<script>
    export default{
        name:'available',
        props:['listInfo'],
        data(){
            return{
                discountValue:'',
                num:'001'
            }
        },
        created(){
            console.log(this.listInfo);
            if(this.listInfo.discountValue>1){
                var str ="$"+this.listInfo.discountValue;
                this.discountValue = str;
            }else{
                var str=Number(this.listInfo.discountValue*100).toFixed(0);
                str+="%";
                this.discountValue = str; 
            }
        },
        methods:{
            useType(coupon){
                if (coupon.deviceType == 7) {
                    return " All";
                }
                let strings = [];
                if (coupon.deviceType & 1) {
                    strings.push("Desktop");
                }
                if (coupon.deviceType & 2) {
                    strings.push("Mobile");
                }
                if (coupon.deviceType & 4) {
                    strings.push("APP");
                }
                let result = strings.join(", ");
                return result;
            },
            getTime(info){
                if(info.purchaseDateDescription!=undefined){
                    return info.purchaseDateDescription;
                }else if(info.serviceDateDescription!=undefined){
                    return info.serviceDateDescription;
                }
            }
            // getDescription(str){
            //     var strArr = str.split('<br/>');
            //     let arr = "";
            //     for(let list of strArr){
            //         arr+= '<span>'+list+'</span>'
            //     }
            //     return arr;
            // }
        }
    }
</script>

<style scoped>
    .product-card{
        width:284px;
        /* height:253px; */
        background:rgba(255,255,255,1);
        box-shadow:2px 4px 12px 0px rgba(51,51,51,0.16);
        margin-bottom: 40px;
        position: relative;
        /* z-index: 1; */
    }
    .left-ridus,.right-ridus{
        width: 20px;
        height: 40px;
        background: #F5F5F5;
        position: absolute;
    }
    .left-ridus{
        left: 0px;
        top: 108px;
        border-radius: 0 20px 20px 0;
    }
    .right-ridus{
        left: 268px;
        top: 108px;
        border-radius: 20px 0 0 20px;
    }
    .product-top{
        width:284px;
        height:12px;
        /* background:rgba(248,76,76,1); */
        background: #FF9A0D;
        border-top-left-radius: 4px;
        border-top-right-radius:4px;
    }
    .product-container{
        width: 284px;
        /* height: 241px; */
    }
    .product-extra{
        margin: 0 auto;
        width: 254px;
        height: 96px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-bottom: 0.5px solid #EFEFEF;
    }
    .product-tltle1{
        /* width:65px; */
        height:20px;
        font-size:18px;
        font-weight:normal;
        color:#FF9A0D;
        line-height:21px;
    }
    .product-tltle2{
        /* width:49px; */
        height:27px;
        font-size:24px;
        font-weight:bold;
        color:#FF9A0D;
        line-height:28px;
    }
    .product-tltle3{
        /* width:35px; */
        height:25px;
        font-size:18px;
        font-weight:400;
        color:#FF9A0D;
        line-height:25px;
    }
    .product-bus{
        width: 284px;
        height: 70px;
    }
    .product-intro1,.product-intro2,.product-intro3,.product-intro4{
        padding-left: 8px;
        height:16px;
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
        font-size:12px;
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .product-intro3{
        margin-top: 2px;
        font-size: 12px;
    }
    .product-intro4{
        margin-top: 2px;
        font-size: 12px;
    }
    .product-details{
        padding-left:8px; 
        /* ---------------------- */
        /* height:15px; */
        font-size:13px;
        color:#2D5687;
        margin-top: 10px;
        line-height:15px;
    }
    .down{
        margin-left: 5px;
    }
    .infiDes{
        color:rgba(51,51,51,1);
        font-size: 12px;
        line-height: 16px;
    }
    >>> .el-collapse{
        border-top: none;
        border-bottom: none;
    }
    >>> .el-collapse-item__header{
        height: 30px;
        line-height: 30px;
        color:#29507D;
        border-bottom: none;
        font-size: 12px;
    }
    >>> .el-collapse-item__wrap{
        /* z-index: 100; */
    }
    >>> .el-collapse-item__content{
        padding-bottom: 10px;
    }
</style>