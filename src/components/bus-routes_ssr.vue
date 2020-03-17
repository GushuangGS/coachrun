<template>
<div>
    <my-header v-if="!isApp" :tourHtml="this.tourHtml"></my-header>
    <el-main v-bind:class = "{app: isApp}">
      <div v-if="!isApp">
        <div v-for="section in this.data.sections" :key="section.groups[0].type">
            <BusRoutes :section="section"></BusRoutes>
        </div>
      </div>
      <div v-else>
          <div  v-for="section in appDataSections" :key="section.groups[0].type">
          <SectionBox :section="section"></SectionBox>
          </div>
      </div>
    </el-main>
    <my-footer v-if="!isApp" :thisYear="this.thisYear"></my-footer>
  </div>
</template>
<script>
// import SectionBox from '@/components/pages/section/SectionBox'
import BusRoutes from '@/components/pages/section/BusRoutes'
import MobileDetect from 'mobile-detect'
import MyHeader from '../common/MyHeader'
import MyFooter from '../common/MyFooter'
import  cookie from 'js-cookie'
export default {
  data() {
    return {
      isApp: false,
    }
  },
  computed: {
    appDataSections(){
     return  this.data.sections.filter(section => {
        return section.groups[0].type == 'top-bus-trips' || section.groups[0].type == 'bus-search-frame';
      })
    }
  },
  async asyncData(context) {
    let isPreview = 0;
    if(process.env.PREVIEW){
        isPreview = 1
    }

    let newData;
    let html; 
    var promiseData = context.$axios({
        method: 'get',
        params: {
          preview: isPreview
        },
        url: process.env.BASE_URL + '/api/pages/bus-routes',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': Buffer.from(process.env.API_KEY).toString('base64'),
        }
      }).then((response)=>{
        if (response.data.code == 200){
          newData = response.data.data;
          console.log(newData,'222')
        }
      })

    var promiseHtml = context.$axios({
        methods:"get",
        params:{
          ids:1
        },
        url:"https://www.coachrun.com/api/pages/toolbars",
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': Buffer.from(process.env.API_KEY).toString('base64'),
        }
      }).then((res)=>{
        if (res.data.code == 200){
          html = res.data.data[1];
        }
      })

    let date = new Date();

    return Promise.all([promiseData,promiseHtml]).then( res=>{
      return {
          data: newData,
          tourHtml: html,
          thisYear: date.getFullYear()
      }
    })
  },
  head() {
    return {
      title: this.data.page.metaTitle ? this.data.page.metaTitle : this.title,
      meta: [
        {
          name: "keywords",
          content: this.data.page.metaKeywords
            ? this.data.page.metaKeywords
            : this.keywords
        }, {
          name: "description",
          content: this.data.page.metaDescription
            ? this.data.page.metaDescription
            : this.description
        }
      ]
    }
  },
  mounted() {
    if (process.client) {
      let md = new MobileDetect(window.navigator.userAgent);
      if (md.mobile() && process.env.BASE_URL.includes('www')&&cookie.get('fullWebsite')!=1) {
         location.href = 'https://m.coachrun.com/';
      }
      this.isApp = window.localStorage.appDomain ? true : false;
      if(this.isApp){
          document.documentElement.style.webkitUserSelect='none'
          document.documentElement.style.webkitTouchCallout='none'
      }
    }
  },
  components: {
    // SectionBox,
    BusRoutes,
    MyHeader,
    MyFooter
  },
  name: 'bus-routes',
  transition: 'test'
}
</script>
<style scoped>
.el-main {
  padding: 0px !important;
  margin-top: 80px ;
  overflow: hidden !important;
}
.select-show {
  display: block !important;
}
@media screen and (max-width: 767px) {
  .el-main {
    margin-top: 44px ;
  }
}

.app{
  margin-top: 0px !important;
}
</style>
