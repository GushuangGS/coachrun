<template>
    <div class="header">
        <el-button @click="login">login</el-button>

    </div>
</template>

<script>
    export default{
        name:'MyHeader',
        data(){
            return{

            }
        },
        created(){},
        methods:{
            login(){
                this.$router.push({name: 'Login'});
            }
        }
    }


</script>

<style scoped>
.header{
    height: 50px;
    background: skyblue;
    margin-bottom: 20px;
}

</style>