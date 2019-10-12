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
                    <span class="product-intro2">
                        <span>
                                Purahase time: 
                        </span>
                        <el-tooltip :content="getTime(listInfo)" effect="light" placement="top-start">
                            <span>{{getTime(listInfo)}}</span>
                        </el-tooltip>
                    </span>
                    <span class="product-intro3" v-show="listInfo.oneTimeUse ==true">Limited 1 Time Offer</span>
                    <span class="product-intro4">Applicable device: {{useType(listInfo)}}</span>
                </div>
                <!-- <div class="expired-deals" v-show="listInfo.isExpired ==true"> -->
                <div class="expired-deals">
                    This coupon expired on {{listInfo.expiredDate}}
                </div>
                <div class="expired-deals" v-show="listInfo.usedDate ==''">
                    This coupon used on {{listInfo.usedDate}}
                </div>
                <!-- <div class="product-details">
                    <el-collapse>
                        <el-collapse-item>
                            <template slot="title">
                                View promotion detail
                                <img class="down"src="@/assets/down.png" alt=""> 
                            </template>
                            <div class="infiDes" v-html="listInfo.description"></div>
                            <div v-for="(item,index) in listInfo.products" :key="index">
                                {{item.name}}
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div> -->
            </div>
            <!-- <div class="left-ridus"></div>
            <div class="right-ridus"></div> -->
            <div class="top-img">
                <img  v-show="listInfo.usedDate ==''"  src="@/assets/used.png" alt="">
                <img  v-show="listInfo.isExpired ==true"  src="@/assets/expired.png" alt="">
            </div>
        </div>
    </template>
    
    <script>
        export default{
            name:'un-available',
            props:['listInfo'],
            data(){
            return{
                discountValue:''
                }
            },
            created(){
                console.log(this.listInfo.discountValue);
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
                    if((coupon.deviceType & 7) == 7){
                        return 'All'
                    }
                    return ((coupon.deviceType & 1) == 1
                    ? "Desktop" + ","
                    : "") +
                    ((coupon.deviceType & 2) == 2
                    ? "Mobile" + ","
                    : "") +
                    ((coupon.deviceType & 4) == 4 ? "APP" : "")
                },
                getTime(info){
                    if(info.purchaseDateDescription!=undefined){
                        return info.purchaseDateDescription;
                    }else if(info.serviceDateDescription!=undefined){
                        return info.serviceDateDescription;
                    }
                }
            }
        }
    </script>
    
    <style scoped>
        .product-card{
            width:284px;
            /* height:253px; */
            background:rgba(235,235,235,1);
            margin-bottom: 40px;
            position: relative;
        }
        .left-ridus,.right-ridus{
            width: 20px;
            height: 40px;
            background: #ffffff;
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
        .top-img{
            position: absolute;
            right: 0;
            top: 0;
        }
        .product-top{
            width:284px;
            height:12px;
            background:#E0E0E0;
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
            border-bottom: 0.5px solid #D7D7D7;
        }
        .product-tltle1{
            /* width:65px; */
            height:20px;
            font-size:18px;
            font-family:Arial-BoldMT;
            font-weight:normal;
            color:#666666;
            line-height:21px;
        }
        .product-tltle2{
            /* width:49px; */
            height:27px;
            font-size:24px;
            font-family:Arial-BoldMT;
            font-weight:bold;
            color:#666666;
            line-height:28px;
        }
        .product-tltle3{
            /* width:35px; */
            height:25px;
            font-size:18px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#666666;
            line-height:25px;
        }
        .product-bus{
            width: 284px;
            height: 70px;
        }
        .product-intro1,.product-intro2,.product-intro3,.product-intro4{
            padding-left: 8px;
            height:16px;
            color:#666666;
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
        .expired-deals{
            padding-left:8px; 
            height:30px;
            font-size:12px;
            color:#666;
            margin-top: 10px;
            line-height:30px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .product-details{
            padding-left:8px; 
            /* height:15px; */
            font-size:12px;
            color:#2D5687;
            margin-top: 10px;
            line-height:15px;
        }
        .infiDes{
            color:rgba(51,51,51,1);
            font-size: 12px;
            line-height: 16px;
        }
        .down{
            margin-left: 5px;
        }
    
        >>> .el-collapse{
            border-top: none;
            border-bottom: none;
        }
        >>> .el-collapse-item__header{
            height: 30px;
            line-height: 30px;
            color:#2D5687;
            border-bottom: none;
            background: none;
        }
        >>> .el-collapse-item__wrap{
            background-color: #EBEBEB;
        }
        >>> .el-collapse-item__content{
            padding-bottom: 10px;
        }
    </style>