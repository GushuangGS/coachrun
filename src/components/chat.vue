<template>
  <div>
    <div class="ask-question-icon" v-hammer:pan="move" v-hammer:tap="chat_click">
      <i class="icon-chat"></i>
    </div>
    <div class="ask-question-slider" ref="chat">
      <div class="loading" v-show="loading_show">
        <img src="@/assets/large-loading.gif" />
      </div>
      <iframe
        @load="load_finish"
        :src="chat_url"
        class="chat"
        scrolling="no"
        style="height:100%;width:100%;border:none;"
        name="chatframe"
        v-show="iframe_show"
      ></iframe>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      chat_url: "",
      show: false,
      loading_show:true,
      iframe_show:false
    };
  },
  created(){
    console.log($(".ask-question-slider"))
  },
  methods: {
    load_finish(){
      this.iframe_show=true
      if(this.chat_url){
        this.loading_show=false
      }
    },
    chat_click() {
      console.log(1)
      this.chat_url = "https://www.coachrun.com/chat/live-coachrun.html";
      this.$refs.chat.style.display="block";
    },
    move(e) {
      var icon = document.querySelector(".ask-question-icon");
      var maxW = document.documentElement.clientWidth - icon.offsetWidth;
      var maxH = document.documentElement.clientHeight - icon.offsetHeight;
      e.preventDefault();
      var Left = e.center.x - icon.offsetWidth / 2;
      var Top = e.center.y - icon.offsetHeight / 2;
      if (Left < 0) {
        Left = 0;
      } else if (Left >= maxW) {
        Left = maxW;
      }
      if (Top < 0) {
        Top = 0;
      } else if (Top >= maxH) {
        Top = maxH;
      }
      icon.style.right = maxW - Left + "px";
      icon.style.bottom = maxH - Top + "px";
    },
  }
};
</script>

<style>
.ask-question-icon {
  position: fixed;
  z-index: 1000;
  right: 20px;
  bottom: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 26px;
  box-shadow: 0px 2px 12px 0 rgba(48, 144, 255, 0.25);
  background-color: #3090ff;
  color: #fff;
  border-radius: 12px;
}
.ask-question-slider {
  position: fixed;
  overflow: hidden;
  display: none;
  bottom: 0px;
  z-index: 2000;
  background: rgb(255, 255, 255);
  width: 375px;
  height: 600px;
  right: 20px;
  border-radius: 10px 10px 0px 0px;
  box-shadow: rgb(204, 204, 204) 0px 0px 20px;
}
@media screen and (max-width: 768px) {
  .ask-question-slider {
    top:0;
    left: 0;
    bottom:0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius:0;
  }
}
.loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
