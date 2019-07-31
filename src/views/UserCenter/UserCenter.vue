<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <el-header height="50px" class="layout-border"></el-header>
          <el-container>
            <el-aside width="182px" class="layout-border">
            </el-aside>
            <el-main class="layout-border">
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
    components: {
    },
  name: 'UserCenter'
}
</script>

<style scoped>
  .content {
    width: 1170px;
    margin: 0 auto;
  }
  .layout-border {
    border: 1px solid #aaa;
  }
</style>
