<template>
    <div class="wrap-box">
        <div class="wrap">
            <div class="send-img">
                <img src="@/assets/message.png" alt="">
            </div>
            <div class="content">
                <span class="title">Please Check Your Email Inbox</span>
                <p class="main">An email has been sent to {{$store.state.sendEmail}}.
                        Please follow the instructions in the email to
                        set your new password. If the e-mail address 
                        you entered {{$store.state.sendEmail}} is associated with 
                        a customer account in our records, you will receive an 
                        e-mail from us with instructions to reset your password. 
                        If you don't receive this e-mail, please check your junk 
                        mail folder or visit our Help pages to contact Customer 
                        Service for further assistance.</p>
             </div>
        </div>
        <span @click="back" class="back">Back ></span>
    </div>
</template>

<script>
    export default{
        name:'RemindEmail',
        data(){
            return{

            }
        },
        methods:{
            back(){
                // this.$router.push({name: 'MyDeals'});
                this.$router.go(-1);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .wrap-box{
        width: 886px;
        min-height: 525px;
        margin: 50px auto 0;
    }
    .wrap{
        background: #FAECCC;
        /* width: 886px; */
        height: 160px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .send-img{
        width: 27px;
        height: 22px;
        margin-left:40px;
        margin-top:26px;  
    }
    .send-img img{
        width: 100%;
        height: 100%;
    }
    .content{
        margin-top: 27px;
    }
    .title{
        color: #8A6D3B;
        font-size: $SubheadlineSize;
        font-weight: bold;
    }
    .main{
        width: 779px;
        height: auto;
        font-size: $Body2Size;
        color: #8A6D3B;
        line-height: 20px;
    }
    .back{
       display: flex;
       justify-content: flex-end;
       color: #274F7C;
       margin-top: 30px;
       margin-right: 10px;
       cursor: pointer;
    }
</style>