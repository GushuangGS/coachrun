<template>
    <span>
        <router-link style="color: inherit;" :to="link" v-if="router">{{text}}</router-link>
        <a style="color: inherit;" :href="link" v-else>{{text}}</a>
    </span>
</template>
  
  <script>
    export default {
      props: {
        router: {
            type: Boolean,
            default: true // true => router-link, false => a标签
        },
        link:'',
        text:''
      },
      name: 'MyRouterLink'
    }
  </script>
  