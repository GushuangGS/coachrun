<template>
    <div class="user-center">
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
  name: 'UserCenter'
}
</script>

<style scoped>

</style>
