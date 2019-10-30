<template>
  <a :href="`${to}${txt}`">{{text}}{{txt}}</a>
  <!-- <a :href="`${to}`">{{text}}{{txt}}</a> -->
</template>

<script>
export default {
  props: {
    to: "",
    text: "",
    query: {
    }
  },
  created(){
    
  },
  data() {
    return {
      linkTxt:{}
    };
  },
  name: "IvyLink",
  computed:{
    txt:function(){
      let obj = this.query;
      let str = '?';
      console.log(obj)
      if(obj!=undefined){
        Object.keys(obj).forEach(function(key){
          str+=`${key}=${obj[key]}&`
          console.log(str)
        })
        return str.substring(0,str.length-1)
      }else{
        return ''
      }
    }
  },
  watch:{
    query(val){
      this.linkTxt = val;
      console.log(val)
    },
    text(val){
      console.log(val)
    }
  }
};
</script>