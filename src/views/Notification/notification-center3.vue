<template>
    <div>
        <notificationPc :apiDomain="apiDomain" :apiKey="apiKey" :loginUrl="loginUrl"></notificationPc>
        <!-- <notification></notification>    -->
    </div>
</template> 

<script>
    import notificationPc from 'ivy-notification-pc/lib/ivyNotificationPc.umd'
    // import notificationPc from 'ivy-notification-pc'
    // import notification from 'ivy-notification-button'
    export default {
        data(){
            return{
                apiDomain:'http://sandbox.gotobus.com',
                apiKey:'MTowOjA6MA==',
                loginUrl:'http://sandbox.gotobus.com/login/html'     
            }
        },
        name: 'notification-center',
        components:{notificationPc}
    }
</script>  
<style scoped>
    
</style>