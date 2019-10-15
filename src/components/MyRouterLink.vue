<template>
    <div>
        <router-link style="color: inherit;" :to="hrefLink" v-if="status">{{domText}}</router-link>
        <a style="color: inherit;" :href="hrefLink" v-else>{{domText}}</a>
    </div>
</template>
  
  <script>
    export default {
      props: {
        status: {
            type: Boolean,
            default: true // true => router-link, false => a标签
        },
        hrefLink:'',
        domText:''
      },
      name: 'MyRouterLink'
    }
  </script>
  