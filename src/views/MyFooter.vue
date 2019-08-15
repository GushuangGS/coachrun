<template>
    <div class="footer">
        <div class="footer-top">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="bot-logo">
                        <img src="@/assets/whitecoachrunlogo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>
                        <p class="bot-title">ABOUST US</p>
                        <span class="about">CoachRun provides affordable inter-city bus 
                            services on the East Coast, Florida and the West Coast.
                        </span>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="bot-link">
                        <p class="bot-title">MAIN MENU</p>
                        <!-- <a href="">Home</a> -->
                        <router-link :to="{name:'Login'}">Home</router-link>
                        <a href="">Bus routes</a>
                        <a href="">Bus Stations</a>
                        <a href="">Bus Rental</a>
                        <a href="">Hotel</a>
                        <a href="">Ticket Policy</a>
                    </div>
                </el-col>
                <el-col :span="5" class="contact">
                    <div class="bot-contact">
                        <p class="bot-title">CONTACT</p>
                        <span>Company: Coach Run Inc</span>
                        <span>Phone: 617-681-0820</span>
                        <span>Email: support@coachrun.com</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <p class="bot-title">WE ACCEPT</p>
                        <div class="bot-imgs">
                            <img src="@/assets/visa.png" alt="">
                            <img src="@/assets/ae.png" alt="">
                            <img src="@/assets/mastercard.png" alt="">
                        </div>
                    </div>
                </el-col>
            </el-row>         
        </div>
        <div class="copy">
            Copyright &nbsp;© 2019 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;www.coachrun.com powered by GotoBus
        </div> 
    </div>
</template>

<script>
    export default{
        name:'MyFooter',
        data(){
            return{

            }
        },
        created(){},
        methods:{
            
        }
    }


</script>

<style scoped>
.footer{
    background: #00A2FF;
}
.footer-top{
    height: 300px;
    /* background: #00A2FF; */
    padding: 51px 200px 71px 300px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color:rgba(255,255,255,1);
    line-height: 20px;
}
.bot-logo{
    margin-top: 50px;
}
.bot-title{
    color:rgba(255,255,255,1);
    font-size:16px;
    font-weight: bold;
    margin-bottom: 20px;
}
.bot-link{
    display: flex;
    flex-direction: column;
}
.bot-link a{
    text-decoration: none;
    color:rgba(255,255,255,1);
}
.contact{
    margin-left: 60px;
}
.bot-contact{
    display: flex;
    flex-direction: column;
}
.bot-contact span{
    line-height: 25px;
}
.bot-imgs{
    display: flex;
    justify-content: space-between;
}
.about{
    line-height: 25px;
}
.copy{
    height: 43px;
    text-align: center;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 43px;
    border-top: 1px solid rgba(0,162,255,1);
    font-size: 12px;
}
</style>