<template>
    <div class="c-width" v-if="section.groups.length">
        <div v-for="group in section.groups" :key="group.type">
          <component
            :is="group.type"
            :group="group"
          ></component>
        </div>
    </div>
</template>
<script>
  import BusSearchFrame from '@/components/pages/group/BusSearchFrame'
  import AllBusRoutes from '@/components/pages/group/AllBusRoutes'
    export default {
      props:{
        section:Object
      },
      components: {
        BusSearchFrame,
        AllBusRoutes
      },
      name:"BusRoutes"
    }
</script>
