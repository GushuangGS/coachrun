<template>
  <div class="success-box">
    <img src="./img/success.png">
    <div>
      <h2>Succeed</h2>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    name: 'SuccessBox'
  }
</script>

<style scoped>
  .success-box {
    box-sizing: border-box;
    width: 690px;
    height: 92px;
    padding-left: 36px;
    display: flex;
    align-items: center;
    border: 2px solid #08A66C;
    border-radius: 4px;
    line-height: 1;
  }
  .success-box>img {
    width: 26px;
    height: 26px;
    margin-right: 20px;
  }
  .success-box>div>h2 {
    margin-top: 0;
    margin-bottom: 6px;
    color: #08A66C;
    font-size: 20px;
  }
  .success-box>div>p {
    margin: 0;
    font-size: 16px;
  }
</style>
