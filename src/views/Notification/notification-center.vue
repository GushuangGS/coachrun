<template>
  <div style="margin-bottom: 30px">
    <el-main>
      <div class="floatR message-list" id="message-system">
        <!-- safe -->
        <div class="mask-wrap" v-show="maskShow" @click="maskShowSwt"></div>
        <div class="message-notify">
          <div class="message-title">
            <span>Notifications</span>
            <div class="settings" v-if="ivyCustomer_role<3">
              <div @click="setting" class="setting-btn-box">
                <i class="icon-cog"></i>
                <span>Settings</span>
              </div>
              <div class="setting-box" v-show="showSetChoose">
                <div class="set-title">
                  What Notifications You Receive
                </div>
                <div class="set-list" v-for="item in setList" :key="item.templateId">
                  <!-- <img src="./img/setting-booking.png" alt=""> -->
                  <img :src="require(`@/assets/icon-notification-type-${item.templateType}.png`)"
                       v-if="[5,9,15,8000].indexOf(item.templateType) >= 0"/>
                  <img :src="require(`@/assets/icon-notification-type-0.png`)" v-else/>
                  <span>{{item.templateName}}</span>
                  <input class="set-check" type="checkbox" v-model="item.disabled"
                         @click="settingCheck(item.templateId,item.disabled)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message-nav-bar">
          <div class="all-msg-box">
            <input id="select-all-msg" type="checkbox" v-model="checked" @click="checkAll"/>
            <label for="select-all-msg" class="msg-label">All</label>
          </div>
          <div class="msg-remove-box">
            <button type="button" id="msg-remove-btn" @click="removeAllCheck">
              Remove
            </button>
          </div>
          <div>
            <button type="button" id="msg-mark-btn" @click="markAllCheck">
              Mark as read
            </button>
          </div>
        </div>
        <div class="message-list">
          <div>
            <div class="message-list-table">
              <div class="no-message" v-show="noMsg">You have no new notifications.</div>
              <div class="msg-list-group" v-show="MsgList.new.length!=0">
                <div class="message-table-title">New</div>
                <div class="message-table-item" :class="{'read':item.status==2,'msg-item-checked':checkModel.indexOf(item.id)>=0}" @mouseleave="showSet=false"
                     v-for="(item,index) in MsgList.new" :key="index"
                     @click="item.status==1?setMessage(item.id,item.status):false"
                >
                  <div class="message-table-check">
                    <input type="checkbox" v-model="checkModel" :value="item.id"/>
                  </div>
                  <div class="message-table-content">
                    <div class="message-table-type">
                      <img :src="require(`@/assets/icon-notification-s28-type-${item.templateType}.png`)"
                           v-if="[5,9,15,8000].indexOf(item.templateType) >= 0"/>
                      <img :src="require(`@/assets/icon-notification-s28-type-0.png`)" v-else/>
                      <!-- <img src="./img/backup-busbooking.png" alt=""> -->
                    </div>
                    <div class="message-table-schedule">
                      <div class="message-schedule-title">
                        <span>{{item.title}}</span>
                        <i class="icon-ellipsis" @click="showSetting">
                          <div class="msg-setting-box" v-show="showSet">
                            <span class="msg-read" @click="setMessage(item.id,item.status)">{{item.status==1?'Mark as read':'Mark as unread'}}</span>
                            <span class="msg-remove" @click="setMessage(item.id,3)">Remove this notification</span>
                          </div>
                        </i>
                      </div>
                      <div class="message-schedule-description">
                        {{item.content}}
                      </div>
                      <div class="message-schedule-date">
                        {{item.timestamp}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="msg-list-group" v-show="MsgList.early.length!=0">
                <div class="message-table-title">Early</div>
                <div class="message-table-item" :class="{'read':item.status==2}" @mouseleave="showSet=false"
                     v-for="(item,index) in MsgList.early" :key="index"
                     @click="item.status==1?setMessage(item.id,item.status):false">
                  <div class="message-table-check">
                    <input type="checkbox" v-model="checkModel" :value="item.id"/>
                  </div>
                  <div class="message-table-content">
                    <div class="message-table-type">
                      <!-- <img src="./img/backup-busbooking.png" alt=""> -->
                      <img :src="require(`@/assets/icon-notification-s28-type-${item.templateType}.png`)"
                           v-if="[5,9,15,8000].indexOf(item.templateType) >= 0"/>
                      <img :src="require(`@/assets/icon-notification-s28-type-0.png`)" v-else/>
                    </div>
                    <div class="message-table-schedule">
                      <div class="message-schedule-title">
                        <span>{{item.title}}</span>
                        <i class="icon-ellipsis" @click="showSetting">
                          <div class="msg-setting-box" v-show="showSet">
                            <!-- <span class="msg-read" @click="setMessageRequire(item.id,2)">Mark as read</span> -->
                            <span class="msg-read" @click="setMessageRequire(item.id,item.status)">{{item.status==1?'Mark as read':'Mark as unread'}}</span>
                            <span class="msg-remove" @click="setMessageRequire(item.id,3)">Remove this notification</span>
                          </div>
                        </i>
                      </div>
                      <div class="message-schedule-description">
                        {{item.content}}
                      </div>
                      <div class="message-schedule-date">
                        {{item.timestamp}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination-wrapper">
          <el-pagination
            background
            :hide-on-single-page="true"
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="pagesize"
            :current-page="nowPage"
            @current-change="getMsgList"
          >
          </el-pagination>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  export default {
    data() {
      return {
        showSet: false,
        maskShow: false,
        checked: false, //是否全选
        checkModel: [],//双向数据绑定的数组
        showSetChoose: false,
        noMsg: false,
        nowPage: 1,
        pageCount: 0,
        totalCount: 0,//总条数
        MsgList: {
          new: [],
          early: []
        },
        setList: [],//获取setting内的选中列表
        allMsgList: [],//总条数
        setMsgId: "",//msg-ig
        setMsgType: "",//msg-ststus
        removeList: [],
        markList: [],
        currentPage: 1, //初始页
        pagesize: 1,    //每页的数据
        ivyCustomer_role:false,
      }
    },
    created() {
      this.ivyCustomer_role = Cookies.get("IvyCustomer_role");
      this.getMsgSettingList();
      this.getMsgList();
    },
    mounted(){

    },
    watch: {
      checkModel() {
        console.log(this.checkModel);
        if (this.checkModel.length == this.allMsgList.length&&this.checkModel.length!=0) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    },
    methods: {
      //click mask
      maskShowSwt() {
        this.showSetChoose = false;
        this.maskShow = false;
      },
      //show read-and-remove
      showSetting() {
        this.showSet = !this.showSet;
      },

      //mark as read
      setMessageRequire(id, type) {
        let status = undefined;
        if (type==1){
          status = 2
        } else if(type==2){
          status = 1
        }else if (type==3) {
          status = 3
        }
        this.$http.patch(`${process.env.VUE_APP_NOTIFICATION_BASEURL}/api/users/notifications/${id}`,
          {
            id,
            status
          }).then((res) => {
          // console.log(res);
          if (res.data && res.data.code == 200) {
            let updateItemInd = 0;
            let ind = 0;
            for (let i in this.MsgList) {
              this.MsgList[i].forEach((item, index) => {
                if (item.id == id) {
                  ind = i;
                  updateItemInd = index;
                }
              })
            }
            if (status != 3) {
              this.MsgList[ind][updateItemInd].status = status;
            } else {
              if ((this.MsgList.new.length+this.MsgList.early.length)==1) {//当前页只有一个item的时候
                if (this.nowPage<=1) {//第一页
                  this.MsgList[ind].splice(updateItemInd, 1);
                  this.noMsg = true;
                } else if (this.nowPage==this.pageCount) {//最后一页，往前翻一页
                  this.nowPage = this.nowPage - 1 ;
                  console.log(this.nowPage);
                  this.getMsgList(this.nowPage);
                }else {//重新请求当前页
                  this.getMsgList(this.nowPage);
                }
              } else {
                this.MsgList[ind].splice(updateItemInd, 1);
              }
            }

          }
        })
      },
      //click setting
      setting() {
        this.showSetChoose = !this.showSetChoose;
        this.maskShow = true;
      },
      settingCheck(id, chooseInp) {
        var disabledType = null;
        if (chooseInp == 1 || chooseInp == true) {
          disabledType = 0;
        } else {
          disabledType = 1;
        }
        this.$http.put(`${process.env.VUE_APP_NOTIFICATION_BASEURL}/api/users/notifications/settings`, {
          templateId:id,
          disabled:disabledType
        },).then((res) => {
          this.nowPage = 1;
        })
      },
      //全选
      checkAll() {
        if (this.checked) {
          this.checkModel = [];
        } else {
          this.allMsgList.forEach((item) => {
            if (this.checkModel.indexOf(item.id) == -1) {
              this.checkModel.push(item.id)
            }
          })
          console.log(this.checkModel);
        }
      },
      //get all msg-list
      getMsgList(nowPage) {
        if (nowPage){
          this.nowPage = nowPage;
        }
        this.checked = false;
        this.checkModel = [];
        this.$http.get(`${process.env.VUE_APP_NOTIFICATION_BASEURL}/api/users/notifications/notification-center`, {
          params: {
            pageNo: this.nowPage,
            pageSize: this.pagesize
          }
        }).then((res) => {
          console.log(res,"数据请求一次");
          if (res.data && res.data.code == 200) {
            if (res.data.data.pagination.totalCount == 0) {
              this.noMsg = true;
              return;
            } else if (this.nowPage == 1 && res.data.data.pagination.currentResults.length == 0) {
              this.noMsg = true;
              return;
            } else {
              this.noMsg = false;
            }
            //初始化cookie中的IvyCustomer_NewNotificationCount
            // Cookies.set("IvyCustomer_NewNotificationCount","")
            document.cookie = `IvyCustomer_NewNotificationCount=;domain=".coachrun.com";path=/`;
            //第一次请求成功时获取页数
            this.totalCount = res.data.data.pagination.totalCount;
            //获取当前页列表
            this.allMsgList = res.data.data.pagination.currentResults;
            // console.log(this.allMsgList[0].id,this.allMsgList[1].id,this.allMsgList[2].id);
            this.MsgList.new = res.data.data.pagination.currentResults.filter((item) => {
              return !item.received;
            })
            this.MsgList.early = res.data.data.pagination.currentResults.filter((item) => {
              return item.received;
            })
          } else if (res.data && res.data.code == 401) {
            // set_cookie("IvyCustomer_LoginToken", "");
            // this.check_token(this.getMsgList);
          }
        })
      },
      //settings
      getMsgSettingList() {
        this.$http.get(`${process.env.VUE_APP_NOTIFICATION_BASEURL}/api/users/notifications/settings`, {}).then((res) => {
          // console.log(res);
          if (res.data && res.data.code == 200) {
            this.setList = res.data.data;
          } else if (res.data && res.data.code == 401) {
            // set_cookie("IvyCustomer_LoginToken", "");
            // this.check_token(this.getMsgSettingList);
          }
        })
      },
      markAllCheck() {
        this.checkModel.forEach((item) => {
          var str = {id: item, status: 2};
          this.markList.push(str);
        })
        this.$http.patch(`${process.env.VUE_APP_NOTIFICATION_BASEURL}/api/users/notifications/bulk`, this.markList, {}).then((res) => {
          if (res.data && res.data.code == 200) {
            for (let i in this.MsgList) {
              this.MsgList[i].forEach((item, index) => {
                if (this.checkModel.indexOf(item.id)!= -1) {
                  this.MsgList[i][index].status = 2;
                }
                if (index==this.MsgList[i].length-1){
                  this.checkModel = [];
                }
              })
            }
            // this.nowPage = 1;
            // this.getMsgList();
          } else if (res.data && res.data.code == 401) {
            // set_cookie("IvyCustomer_LoginToken", "");
            // this.check_token(this.markAllCheck);
          }
        });

      },
      removeAllCheck() {
        this.checkModel.forEach((item) => {
          let str = {id: item, status: 3};
          this.removeList.push(str);
        });
        this.$http.patch(`${process.env.VUE_APP_NOTIFICATION_BASEURL}/api/users/notifications/bulk`, this.removeList, {}).then((res) => {
          if (res.data && res.data.code == 200) {
            if(this.checked == true){//如果当前页全选
              if (this.nowPage==1) {//第一页
                if (this.nowPage==this.pageCount)  {//第一页同时是最后一页
                  this.noMsg = true;
                }else {
                  this.getMsgList(this.nowPage);
                }
              } else if (this.nowPage==this.pageCount) {//最后一页
                this.nowPage -= 1 ;
                this.getMsgList(this.nowPage);
              }else {//中间页，重新请求当前页
                this.getMsgList(this.nowPage);
              }
              this.checked = false;
            }else{
              for (let i in this.MsgList) {
                for (let index = this.MsgList[i].length-1;index>=0; index-- ) {
                  if (this.checkModel.indexOf(this.MsgList[i][index].id)!= -1) {
                    this.MsgList[i].splice(index,1);
                  }
                  if (index==0){
                    this.checkModel = [];
                  }
                }
              }
            }
          } else if (res.data && res.data.code == 401) {
            // set_cookie("IvyCustomer_LoginToken", "");
            // this.check_token(this.removeAllCheck);
          }
        })
      },
    },
    name: 'notification-center'
  }
</script>

<style scoped>
  .message-list {
    float: right;
    width: 794px;
    min-height: 310px;
  }

  .message-notify {
    width: 100%;
  }

  .message-notify .message-title {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }

  .message-title > span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .settings {
    display: flex;
    cursor: pointer;
  }

  .settings > div > i, .settings > div > span {
    font-size: 12px;
    color: #333;
  }

  .message-nav-bar {
    display: flex;
    padding: 10px 0px 10px 10px;
    border-bottom: 1px solid #ddd;
  }

  .message-nav-bar .all-msg-box {
    display: flex;
    align-items: center;
  }

  .message-nav-bar .msg-label {
    padding-left: 6px;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    margin-bottom: 0;
  }

  .message-nav-bar .msg-remove-box {
    margin-left: 30px;
  }

  #msg-mark-btn {
    margin-left: 10px;
  }

  #msg-remove-btn, #msg-mark-btn {
    color: #333;
    display: inline-block;
    padding: 5px 10px;
    margin-bottom: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    background-color: #ededed;
  }

  .message-list-table .message-table-title {
    padding: 5px 0px 5px 28px;
    font-size: 12px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }

  .message-list-table .message-table-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    /* background-color: white;*/
    background: #edf5ff;
  }

  .message-list-table .message-table-type {
    width: 28px;
    height: 28px;
    /*border-radius: 50%;*/
    /*background-color: #1A6EDC;*/
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .message-list-table .message-table-content {
    display: flex;
    align-items: center;
    padding-left: 20px;
    flex: auto;
  }

  .message-list-table .message-table-schedule {
    display: flex;
    flex-direction: column;
    flex: auto;
  }

  .message-table-schedule .message-schedule-title {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }

  .message-table-schedule .message-schedule-title > i {
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: #999;
    margin-right: 20px;
    position: relative;
  }

  .message-table-schedule .message-schedule-title > i:before {
    margin: 0px;
  }

  .message-table-schedule .message-schedule-description {
    font-size: 12px;
    color: #333;
    padding: 5px 10px 5px 0px;
  }

  .message-table-schedule .message-schedule-date {
    padding-bottom: 10px;
    font-size: 12px;
    color: #666;
  }

  .message-setting-flag {
    display: none;
  }

  .message-table-schedule .message-schedule-title .msg-setting-box {
    position: absolute;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    z-index: 2000;
    left: -6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .message-table-schedule .message-schedule-title .msg-setting-box:before {
    content: '';
    position: absolute;
    display: block;
    width: 0px;
    top: -6px;
    left: 6px;
    height: 0px;
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
    border-color: transparent;
    border-style: solid;
    border-top-width: 0;
    border-bottom-color: white;
  }

  .msg-setting-box span {
    display: block;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    color: #333;
    font-size: 12px;
    font-style: normal;
    white-space: nowrap;
  }

  .msg-setting-box span:hover{
    background-color: #f5f7fa;
    /*color: white;*/
  }
  .msg-item-checked {
    background-color: #f5f7fa!important;
  }
  .message-list-table .message-table-check {
    display: flex;
    align-items: center;
  }

  .message-table-item .icon-ellipsis {
    display: none;
  }

  .message-list-table .message-table-item.read {
    /*background-color: #edf5ff;*/
    background: #fff;
    color: white;
  }

  .message-list-table .message-table-item:hover {
    background-color: #cbe2ff!important;
  }

  .message-table-item:hover .icon-ellipsis {
    display: block;
  }

  .message-list-table .message-table-check input {
    margin-left: 10px;
  }

  .settings {
    position: relative;
  }

  .setting-box {
    width: 250px;
    background: #fff;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.19);
    position: absolute;
    top: 20px;
    left: 5px;
    padding: 10px;
    z-index: 2;
  }

  .set-title {
    color: #333333;
    font-size: 14px;
  }

  .set-list {
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .set-list img {
    width: 18px;
    height: 18px;
  }

  .set-list i, .set-list span {
    color: #333;
    margin-left: 10px;
  }

  .set-check {
    position: absolute;
    right: 10px;
  }

  .pagination-wrapper {
    float: right;
    margin-top: 10px;
  }

  .mask-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .setting-btn-box:hover i,.setting-btn-box:hover span{
    color: #f60;
  }
  .el-main {
    overflow: inherit;
  }
  .no-message {
    font-size: 14px;
    padding: 10px;
    color: #333;
  }

</style>
