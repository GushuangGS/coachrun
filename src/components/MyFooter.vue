<template>
    <div class="footer coachrun-footer">
        <div class="footer-top">
            <el-row :gutter="24">
                <el-col :md="4" :sm="4" class="footer-logo">
                    <div class="bot-logo">
                        <img src="@/assets/coachrunlogo.png" alt="">
                    </div>
                </el-col>
                <el-col :md="6" :sm="7">
                    <div>
                        <p class="bot-title">About Us</p>
                        <span class="about">CoachRun provides affordable inter-city bus services on the East Coast, Florida and the West Coast.
                        </span>
                    </div>
                </el-col>
                <el-col :md="4" :sm="3">
                    <div class="bot-link">
                        <p class="bot-title">Main Menu</p>
                        <a href="https://www.coachrun.com/bus-stations/">Bus Stations</a>
                        <a href="https://www.gotocharter.com">Bus Rental</a>
                        <a href="https://www.coachrun.com/hotels/">Hotels</a>
                        <a href="https://www.coachrun.com/ticket-policy/">Ticket Policy</a>
                    </div>
                </el-col>
                <el-col :md="5" :sm="5">
                    <div class="bot-contact">
                        <p class="bot-title">Contact</p>
                        <span>Phone: 617-681-0820</span>
                        <span>Email: support@coachrun.com</span>
                    </div>
                </el-col>
                <el-col :md="4" :sm="4">
                  <div class="local-media">
                    <p class="bot-title">Social Media </p>
                    <div class="local-media-icon-box">
                      <a href="https://www.facebook.com/CoachRunBus/">
                        <i class="icon-facebook-squared"></i>
                      </a>
                      <a href="https://www.instagram.com/coachrunbus/">
                        <i class="icon-instagram"></i>
                      </a>
                      <a href="https://twitter.com/coachrunbus/">
                        <i class="icon-twitter-squared"></i>
                      </a>
                    </div>
                  </div>
                </el-col>
            </el-row>
        </div>
        <div class="copy">
            Copyright © {{year}} <a class="net-link" href="https://www.coachrun.com">www.coachrun.com.</a>&nbsp;All&nbsp;rights&nbsp;reserved
        </div>
    </div>
</template>

    <script>
        export default{
            name:'MyFooter',
            data(){
                return{
                  year:''
                }
            },
            created(){
              let date = new Date();
              this.year = date.getFullYear();
            },
            methods:{

            }
        }
    </script>

<style lang="scss" scoped>
    .net-link {
        text-decoration: none;
        color: #333;
    }
    .net-link:hover{
        color: #009fea;
    }
    .footer{
        background: #f5f5f5;
    }
    .footer-top{
      max-width: 1200px;
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: $Body2Size;
      color:#333;
      line-height: 20px;
      margin: 0 auto;
      // padding-top: 30px;
      // padding-bottom: 30px;
      padding: 30px 10px;
    }
    .bot-logo{
        margin-top: 50px;
    }
    .bot-title{
      color:#333;
      font-size:$Body1Size;
      line-height: 16px;
      font-weight: bold;
      margin-bottom: 15px;
      margin-top: 0px;
    }
    .bot-link{
        display: flex;
        flex-direction: column;
    }
    .bot-link a{
      text-decoration: none;
      color:#333;
      font-size:$Body2Size;
      line-height:24px;
    }

    .bot-contact{
        display: flex;
        flex-direction: column;
    }
    .bot-contact span{
        line-height: 24px;
    }
    .bot-imgs{
        display: flex;
        justify-content: space-between;
    }
    .local-media-icon-box a{
        text-decoration: none;
        color:#333;
        font-size:14px;
        line-height:24px;
    }
    .local-media-icon-box i {
      font-size: 24px;
    }
    .footer-logo {
      min-width: 132px;
    }
    .about{
      line-height: 25px;
      display: inline-block;
      max-width: 229px;
      width: 100%;
      line-height: 24px;
    }
    .copy{
        // height: 43px;
        text-align: center;
        font-weight:400;
        color:#333;
        line-height: 43px;
        font-size: $Body3Size;
      padding-right: 3px;
        box-shadow: 0px 1px 2px 0px #333
    }
    @media screen and (max-width:767px){
        .footer-top {
            display: none !important;
        }
    }
    </style>
<style>
  .coachrun-footer .el-row {
    margin: 0px!important;
  }
  .coachrun-footer .el-col {
    padding-left: 3px!important;
    padding-right: 3px!important;
    margin: auto 2px;
  }
  .footer-logo {
    padding-left: 0px!important;
  }
</style>

<style scoped>
/* .pub-wrap{
	line-height: 1.5rem;
}
.pub-wrap h4 {
	margin-bottom: 0;
	line-height: 1.5rem;
}
.pub-wrap .wrap-txt{
	margin:5px 0;
	line-height: 1.5rem;
}
.pub-wrap h2.font14{
	padding-left: 0;
}
.pub-wrap ul.no_list_style {
	padding-left:10px;
	padding-right: 10px;
	line-height:1.5em;
}
.pub-wrap ul li {
	margin-top: 2px;	
} */
</style>
