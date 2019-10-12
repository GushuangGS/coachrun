<template>
    <div class="footer">
        <div class="footer-top">
            <el-row :gutter="24">
                <el-col :span="5">
                    <div class="bot-logo">
                        <img src="@/assets/whitecoachrunlogo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <p class="bot-title">About Us</p>
                        <span class="about">CoachRun provides affordable inter-city bus services on the East Coast, Florida and the West Coast.
                        </span>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="bot-link">
                        <p class="bot-title">Main Menu</p>
                        <a href="https://www.coachrun.com/bus-stations/">Bus Stations</a>
                        <a href="https://www.gotocharter.com">Bus Rental</a>
                        <a href="https://www.coachrun.com/hotel/">Hotel</a>
                        <a href="https://www.coachrun.com/ticket-policy/">Ticket Policy</a>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="bot-contact">
                        <p class="bot-title">Contact</p>
                        <span>Phone: 617-681-0820</span>
                        <span>Email: support@coachrun.com</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="copy">
            Copyright © 2019 <a class="net-link" href="www.coachrun.com">www.coachrun.com.</a>&nbsp;All&nbsp;rights&nbsp;reserved
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
    .net-link {
        text-decoration: none;
        color: white;
    }
    .net-link:hover{
        color: #22ffff;
    }
    .footer{
        background: #00A2FF;
    }
    .footer-top{
      height: 232px;
      width: 1200px;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color:rgba(255,255,255,1);
      line-height: 20px;
      margin: 0 auto;
      padding-top: 40px;
    }
    .bot-logo{
        margin-top: 50px;
      margin-left: 14px;
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
      font-size:14px;
      line-height:28px;
    }

    .bot-contact{
        display: flex;
        flex-direction: column;
    }
    .bot-contact span{
        line-height: 28px;
    }
    .bot-imgs{
        display: flex;
        justify-content: space-between;
    }
    .about{
      line-height: 25px;
      display: inline-block;
      width: 229px;
      line-height: 28px;
    }
    .copy{
        height: 43px;
        text-align: center;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 43px;
        font-size: 13px;
        box-shadow: 0px 1px 2px 0px rgba(255,255,255,1)
    }
    </style>
