<template>
    <div class="my-points">
      <el-container>
        <!-- <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header> -->
        <el-main>
          <div class="content">
            <div class="brief">
              <div class="brief-left">
                <div class="brief-left-up">Available Points</div>
                <div class="brief-left-middle">
                  <img src="@/assets/points.png">
                </div>
                <div class="brief-left-down">{{resData.availablePoints}}</div>
              </div>
              <div class="brief-right">
                <div class="brief-right-item">
                  <h4>Booking</h4>
                  <p>{{resData.bookingPoints}}</p>
                </div>
                <div class="brief-right-item">
                  <h4>Pending Points</h4>
                  <p>{{resData.pendingPoints}}</p>
                </div>
                <div class="brief-right-item">
                  <h4>Redeemed</h4>
                  <p>{{resData.consumptionPoints}}</p>
                </div>
                <div class="brief-right-item">
                  <h4>Reviews</h4>
                  <p>{{resData.reviewPoints}}</p>
                </div>
                <div class="brief-right-item">
                  <h4>Other</h4>
                  <p>{{resData.otherPoints}}</p>
                </div>
                <div class="brief-right-item help" @click="gotoPoints">
                  Points Help &nbsp;>>
                </div>
              </div>
            </div>
            <div class="detail">
              <h2 class="table-title">Points Details</h2>
              <el-table
                empty-text="Start earning your loyalty points today!"
                :data="tableData"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  label="Source"
                  min-width="160px"
                  header-align="center"
                  align="center">
                  <!-- prop="orderCode" -->
                  <template slot-scope="scope">
                      <span v-show="scope.row.rewardType==0">Booking</span>
                      <span v-show="scope.row.rewardType==1">Review</span>
                      <span v-show="scope.row.rewardType==2">Redeem</span>
                      <span v-show="scope.row.rewardType==3">Other</span>
                      <span v-show="scope.row.rewardType==4">Photo Sharing</span>
                      <span v-show="scope.row.rewardType==5">Photo Likes</span>
                      <span v-show="scope.row.rewardType==6">Review</span>
                      <span v-show="scope.row.orderCode"> (Order {{scope.row.orderCode}})</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                  label="Points"
                  min-width="140px"
                  header-align="center"
                  align="center">
                  <template slot-scope="scope">
                      <span  :class="{'positive': scope.row.rewardPoint > 0, 'negtive': scope.row.rewardPoint < 0}">{{scope.row.rewardPoint}}</span>
                      <span v-if="scope.row.isPending==1" class="text-pending">Pending</span>
                    <!-- <span :class="{'positive': scope.row.points.value > 0, 'negtive': scope.row.points.value < 0, 'pending': scope.row.points.isPending}">{{(scope.row.points.value > 0 ? '+' : '-') + ' ' + Math.abs(scope.row.points.value)}}</span>
                    <span v-if="scope.row.points.isPending" class="text-pending">Pending{{scope}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  prop="timestamp"
                  label="Date"
                  header-align="center"
                  align="center"
                  min-width="130px">
                </el-table-column>
              </el-table>
              <div class="pagination-wrapper" v-if="tableData.length">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="resData.pagination.totalCount"
                  @current-change="handleCurrentChange"
                  :page-size="pagesize"
                  :current-page="currentPage">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/components/ItemHeader'
  export default {
    data() {
      return {
        status: 0,
        headerInfo: [
          [''],
          { description: 'My Points', path: '/app/member/account/points',title:'My Account' }
        ],
        currentPage:1, //初始页
        pagesize:20,    //每页的数据
        tableData: [],
        resData:{}
      }
    },
    components: {
      ItemHeader
    },
    name: 'MyPoints',
    created(){
      this.tableInfo(this.currentPage);
    },
    methods:{
      gotoPoints(){
        window.open('https://www.gotobus.com/points/pointshelp/', '_blank');
      },
      handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              console.log(this.currentPage)  //点击第几页
              this.tableInfo(this.currentPage);
      },
      tableInfo(num){
        this.$http.get(this.$api.viewPoint,
                {params:{pageNo:num,pageSize:this.pagesize}})
                // headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                .then((res)=>{
                    console.log(res);
                    if(res.data.data!=null || res.data.data!=undefined){
                      this.resData = res.data.data;
                      this.tableData = res.data.data.pagination.currentResults;
                      // this.pagesize = res.data.data.pagination.pageCount;
                      console.log((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
                      console.log(this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize))
                    }else{
                      this.resData = {};
                    }
                })
      }

    }
  }
</script>

<style scoped>
  .my-points {
    flex: 1;
  }
  >>> .el-main {
    padding-top: 0;
  }
  .content {
    padding-top: 4px;
  }
  .brief {
    width: 980px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #E9F1FA;
    /* padding: 26px 90px; */
    padding: 26px 90px 26px 40px;
    display: flex;
    align-items: stretch;
  }
  .brief>.brief-left {
    width: 280px;
    display: flex;
    flex-direction: column;
  }
  .brief>.brief-left>.brief-left-up {
    line-height: 1;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }
  .brief>.brief-left>.brief-left-middle {
    text-align: center;
    margin-bottom: 10px;
    border-right: 4px solid #F6F8FB;
  }
  .brief>.brief-left>.brief-left-down {
    text-align: center;
    font-size: 30px;
    line-height: 1;
    font-weight: bold;
    color: #365C86;
  }
  .brief>.brief-right {
    flex: 1 1;
    padding-left: 40px;
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .brief>.brief-right>.brief-right-item {
    width: 33.333%;
    margin-bottom: 12px;
  }
  .brief>.brief-right>.brief-right-item>h4 {
    font-size: 16px;
    line-height: 16px;
    margin-top: 0;
    margin-bottom: 8px;
    color: #999999;
    text-align: center;
    font-weight: normal;
  }
  .brief>.brief-right>.brief-right-item>p {
    /* font-size: 18px; */
    font-size: 15px;
    text-align: center;
    color: #666666;
    margin: 0;
  }
  .help {
    color: #274F7C;
    font-weight: bold;
    line-height: 53px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
  }
  .detail {
    margin-left: 10px;
    margin-top: 40px;
  }
  .detail>.table-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 20px;
    line-height: 1;
  }
  .pagination-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 15px;
  }
  >>> .el-table__header th {
    background-color: #E5EFFA;
    color: #29507D;
    font-size: 18px;
  }
  >>> .el-table_1_column_1 {
    font-size: 16px;
    color: #333;
  }
  >>> .el-table_1_column_2 {
    font-size: 24px;
    font-weight: bold;
  }
  >>> .el-table_1_column_3 {
    font-size: 16px;
    color: #999;
  }
  .positive {
    color: #FF9D0D;
    /* font-weight: bold; */
    font-size: 18px;
  }
  .negtive {
    color: #0BA76E;
    /* font-weight: bold; */
    font-size: 18px;
  }
  .pending {
    opacity: .5;
  }
  >>> .cell {
    position: relative;
    font-size: 16px;
    /* text-align: center; */
  }
  .text-pending {
    font-size: 14px;
    color: #333;
    font-weight: normal;
    position: absolute;
    /* right: 0; */
    margin-left: 15px;
  }
  .pagination-wrapper {
    margin-top: 20px;
  }
  .pagination-wrapper >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #419EFF;
  }
  .pagination-wrapper >>> .el-pagination.is-background .el-pager li:not(.disabled):not(.active):hover {
    color: #419EFF;
  }
  >>> .el-table__empty-text{
    width: 100%;
    text-align: left;
    color: #333333;
    font-size: 16px;
  }
</style>
