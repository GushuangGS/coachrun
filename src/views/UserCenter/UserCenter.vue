<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <el-header height="50px"></el-header>
          <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
      <div class="my-footer-wrapper">
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserCenter'
}
</script>

<style scoped>
  .content {
    width: 1140px;
    margin: 0 auto;
  }
</style>
