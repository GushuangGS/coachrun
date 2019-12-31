<template>
    <div class="member-ship">
        <!-- <img class="user-img" src="@/assets/touxiang.png"> -->
        <div class="member-top">
            <img class="user-img" src="@/assets/memberShip.png">
            <div class="member-user">
                <div class="user-info">
                    <span class="user-name">UserName</span>
                    <div class="user-status">
                        <img src="@/assets/basic.png" alt="">
                        <span class="user-ship">Basic</span>
                    </div>
                    <div class="user-status">
                        <img src="@/assets/gold.png" alt="">
                        <span class="user-ship member-gold">Gold</span>
                    </div>
                </div>
                <div class="expires-show">
                    <span class="member-expires">Membership Expires</span>
                    <span class="member-link mob-link">Mange Membership ></span>
                </div>

            </div>
            <!-- <div class="member-save">
                <span class="member-txt">Saved:</span>
                <span class="save-money">$50.99</span>
            </div>
            <div class="member-link">
                Mange Membership >>
            </div> -->
        </div>
        <div class="ship-show">
            <div class="member-save">
                <span class="member-txt">Saved:</span>
                <span class="save-money">$50.99</span>
            </div>
            <div class="member-link">
                Mange Membership >>
            </div>
        </div>
        <div class="join-ship">
            <div class="save-tips">Save $288 and More</div>
            <div class="ship-btn">Join CoachRun Membership</div>
        </div>
        
        
    </div>
</template>    

<script>
    export default {
        name: "MemberShip",
        props:{},
        data() {
            return {

            }
        },
        created(){

        },
        methods:{
            
        }
    }


</script>

<style scoped>
    .member-ship{
        width: 100%;
        border: 1px solid #EBEEF5;
        /* padding: 10px; */
        font-size: 12px;
        display: flex;
        flex-direction: column;
    }
    .member-top{
        display: flex;
        align-items: center;
        /* flex-direction: column; */
        /* margin-left: 10px;
        margin-top: 5px */
        padding: 10px;
    }
    .user-img{
        width: 48px;
        height: 48px;
    }
    .member-user{
       margin-left: 10px;
        margin-top: 5px
    }
    .user-info{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .user-name{
        font-size: 16px;
        color: #333;
        font-weight: bold;
    }
    .user-status{
        display: flex;
        align-items: center;
        
    }
    .user-status img{
        width: 20px;
        height: 20px;
        margin: 0 5px 0 10px;
    }
    .user-ship{
        font-size: 12px;
        color: #999;
    }
    .member-gold{
        color: #FF9A0D;
    }
    .expires-show{
        display: flex;
        align-items: baseline;
    }
    .member-expires{
        padding: 3px 10px;
        background: #F2F2F2;
        border-radius: 10px;
        color: #666;
        font-size: 12px;
    }
    .ship-show{
        margin-left: 60px;
        padding: 0 10px;
    }
    .member-save{
        /* margin-top: 10px; */
    }
    .member-txt{
        font-size: 14px;
        color: #333;
    }
    .save-money{
        font-size: 18px;
        color: #FF9A0D;
        font-weight: bold;
    }
    .member-link{
        color: #FF9A0D;
        margin-top: 10px;
        cursor: pointer;
    }
    .mob-link{
        margin-left: 10px;
    }
    .join-ship{
        margin-left: 60px;
        padding: 0 10px 10px;
    }
    .save-tips{
        color: #FF4800;
        display: table;
        background:#ff48001a;
        /* border: 1px solid rgba(255,72,0,0.8); */
        padding: 3px;
        position: relative;
    }
    .save-tips::before{
        position: absolute;
        right: 0;
        display: block;
        width: 0;
        top: 20px;
        left: 5px;
        content: "";
        border-width: 6px 6px;
        border-style: solid;
        border-color:#ff48001a transparent transparent transparent;
        -webkit-filter: drop-shadow(0 .026667rem .16rem rgba(0,0,0,.03));
        filter: drop-shadow(0 .026667rem .16rem rgba(0,0,0,.03));

    }
    .ship-btn{
        padding: 7px 8px;
        background-color: #FF9A0D;
        border-radius: 4px;
        display: table;
        margin-top: 8px;
        color: #FFFFFF;
        cursor: pointer;
    }
</style>