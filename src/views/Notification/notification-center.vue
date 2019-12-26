<template>
    <div class="coachrun-notfication">
        <ivy-notification-desktop :apiDomain="apiDomain" :apiKey="apiKey" :loginUrl="loginUrl"></ivy-notification-desktop>
    </div>
</template> 

<script>
    export default {
        data(){
            return{
                apiDomain:process.env.VUE_APP_WEBSITE_DOMAIN,
                apiKey:btoa('7:1350154:0:1'),
                loginUrl:'render/user/login'
                // apiDomain:'http://sandbox.gotobus.com',
                // apiKey:'MTowOjA6MA==',
                // loginUrl:'http://sandbox.gotobus.com/login/html'     
            }
        },
        name: 'NotificationCenter',
    }
</script>  
<style scoped>
    .coachrun-notfication{
        margin-left: 20px;
        margin-top: 10px;
    }
</style>