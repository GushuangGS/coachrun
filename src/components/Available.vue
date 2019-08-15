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
                <span class="product-intro2">Departure time: {{listInfo.serviceDateDescription}}</span>
                <span class="product-intro3" v-if="listInfo.oneTimeUse ==true">Limited 1 Time Offer</span>
                <span>{{listInfo.deviceType}}</span>
            </div>
            <div class="product-details">
                    <el-collapse>
                        <el-collapse-item>
                                <template slot="title">
                                     View promotion detail
                                     <img class="down" src="./img/down.png" alt=""> 
                                </template>
                            <div>{{listInfo.description}}</div>
                            <div>{{listInfo.serviceDateDescription}}</div>
                            <div v-for="(item,index) in listInfo.products" :key="index">
                                {{item.name}}
                            </div>
                        </el-collapse-item>
                    </el-collapse>
            </div>
        </div>
        <div class="left-ridus"></div>
        <div class="right-ridus"></div>
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
            // console.log(this.listInfo.discountValue);
            if(this.listInfo.discountValue>1){
                var str ="$"+this.listInfo.discountValue;
                this.discountValue = str;
            }else{
                var str=Number(this.listInfo.discountValue*100).toFixed(0);
                str+="%";
                this.discountValue = str; 
            }

            // console.log(this.binaryAgent(this.num));
        },
        methods:{
            binaryAgent(str) {
                str = str.split(" ");
                str = str.map((a) => {
                    return String.fromCharCode(parseInt(a, 2));
                }).join("");
                // console.log(str);
                return str;
            }
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #F5F5F5;
        position: absolute;
    }
    .left-ridus{
        left: -17px;
        top: 106px;
    }
    .right-ridus{
        left: 268px;
        top: 106px;
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
        /* height: 241px; */
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
        height: 60px;
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
        /* ---------------------- */
        /* height:15px; */
        font-size:13px;
        color:#2D5687;
        margin-top: 20px;
        line-height:15px;
    }
    .down{
        margin-left: 5px;
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
    }
    >>> .el-collapse-item__wrap{
        /* z-index: 100; */
    }
</style>