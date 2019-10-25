<template>
    <el-button :style="{width: width,height:height,backgroundColor:btnBgc,borderRadius:btnBrds,color:btnColor,fontSize:fontSize}">
        btnTextadsss
    </el-button>
</template>

<script>
    export default{
        name:'myButton',
        props:{
            width:{
                type:String,
                default:'100px'
            },
            height:{
                type:String,
                default:'40px'
            },
            btnBgc:{
                type:String,
                default:'#FFFFFF'
            },
            btnBrds:{
                type:String,
                default:'4px'
            },
            btnColor:{
                type:String,
                default:'#666'
            },
            fontSize:{
                type:String,
                default:'14px'
            }
        }
    }

</script>