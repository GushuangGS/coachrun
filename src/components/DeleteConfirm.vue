<template>
  <div class="delete-confirm" v-show="showFlag">
    <div class="delete-confirm-bg" @click="cancel"></div>
    <div class="delete-confirm-content">
      <div class="header">
        <h2>{{title}}</h2>
        <span @click="cancel" class="close">×</span>
      </div>
      <div class="main">
        <div class="slot-wrapper">
          <slot></slot>
        </div>
        <div class="btn-wrapper">
          <button class="btn confirm-btn" type="button" @click="confirm">Confirm Remove</button>
          <button class="btn cancel-btn" type="button" @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showFlag: true
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      confirm() {
        this.hide()
        this.$emit('confirm')
      }
    },
    name: 'DeleteConfirm'
  }
</script>

<style scoped>
  .delete-confirm {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .delete-confirm-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #8F8F8F;
  }
  .delete-confirm-content {
    box-sizing: border-box;
    width: 790px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    border-radius: 4px;
  }
  .header {
    height: 52px;
    background-color: #F0F0F0;
    position: relative;
  }
  .header>h2 {
    font-size: 20px;
    line-height: 1;
    margin: 0;
    position: absolute;
    left: 30px;
    top: 24px;
  }
  .header>span {
    font-size: 18px;
    position: absolute;
    right: 30px;
    top: 17px;
    cursor: pointer;
  }
  .main {
    background-color: #fff;
    padding-bottom: 20px;
  }
  .slot-wrapper {
    padding-left: 30px;
    padding-top: 20px;
  }
  .btn-wrapper {
    margin-top: 30px;
  }
  .btn-wrapper::before, .btn-wrapper::after {
    display: table;
    content: '';
  }
  .btn-wrapper::after {
    clear: both;
  }
  .btn {
    height: 44px;
    padding: 0;
    border-radius: 4px;
    font-size: 20px;
    line-height: 43px;
    text-align: center;
    float: right;
    cursor: pointer;
    outline: none;
    border-style: none;
  }
  .btn:active {
    outline: none;
    border-style: none;
  }
  .cancel-btn {
    background-color: #FBFBFB;
    width: 115px;
    border: 1px solid #979797;
    margin-right: 20px;
  }
  .confirm-btn {
    background-color: #FFA212;
    width: 182px;
    font-weight: bold;
    color: #fff;
    margin-right: 55px;
  }
</style>
