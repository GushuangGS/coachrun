<template>
    <div class="footer">
      <div class="container">
        <div class="logo-wrapper"></div>
        <div class="about-us"></div>
        <div class="main-menu"></div>
        <div class="contact"></div>
        <div class="we-accept">
          <span class="fa fa-cc-visa"></span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'MyFooter'
  }
</script>

<style scoped>
  .footer {
    background-color: #00A2FF;
    color: #fff;
  }
  .container {
    width: 1140px;
    display: flex;
  }
  .container>div {
    border: 1px solid #aaa;
    flex: 1;
  }
</style>
