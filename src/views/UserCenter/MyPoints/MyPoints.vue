<template>
    <div class="my-points">
      <el-container>
        <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
          <div class="content">
            <div class="brief">
              <div class="brief-left">
                <div class="brief-left-up">Avaliable Points</div>
                <div class="brief-left-middle">
                  <img src="./img/points.png">
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
                  <h4>Redeem</h4>
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
                <div class="brief-right-item help">
                  Points Help &nbsp;>>
                </div>
              </div>
            </div>
            <div class="detail">
              <h2 class="table-title">Points Details</h2>
              <el-table
                empty-text="Start earning your loyalty points today!"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column
                  label="Source"
                  min-width="160px">
                  <!-- prop="orderCode" -->
                  <template slot-scope="scope">
                      <span v-show="scope.row.rewardType==0">Booking</span>
                      <span v-show="scope.row.rewardType==1">Review</span>
                      <span v-show="scope.row.rewardType==2">Redeem</span>
                      <span v-show="scope.row.rewardType==3">Other</span>
                      <span v-show="scope.row.rewardType==4">Photo Sharing</span>
                      <span v-show="scope.row.rewardType==5">Photo Likes</span>
                      <span v-show="scope.row.rewardType==6">Review</span>
                      <span v-show="scope.row.orderCode">(Order {{scope.row.orderCode}})</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                  align="center"
                  header-align="center"
                  label="Points"
                  min-width="140px">
                  <template slot-scope="scope">
                      <span  :class="{'positive': scope.row.rewardPoint > 0, 'negtive': scope.row.rewardPoint < 0}">{{scope.row.rewardPoint}}</span>
                      <span v-if="scope.row.isPending==1" class="text-pending">Pending</span>
                    <!-- <span :class="{'positive': scope.row.points.value > 0, 'negtive': scope.row.points.value < 0, 'pending': scope.row.points.isPending}">{{(scope.row.points.value > 0 ? '+' : '-') + ' ' + Math.abs(scope.row.points.value)}}</span>
                    <span v-if="scope.row.points.isPending" class="text-pending">Pending{{scope}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  header-align="center"
                  prop="timestamp"
                  label="Date"
                  min-width="130px">
                </el-table-column>
              </el-table>
              <div class="pagination-wrapper" v-if="tableData.length">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="tableData.length"
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
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  export default {
    data() {
      return {
        status: 0,
        headerInfo: [
          [''],
          { description: 'My Points', path: '/app/member/account/points',title:'My Account' }
        ],
        currentPage:1, //初始页
        pagesize:10,    //每页的数据
        tableData: [
          // {
          //   source: 'Booking ( Order JT23-600-3427 )',
          //   points: { value: 7, isPending: false },
          //   date: '2019-07-23 23:56:08'
          // }, {
          //   source: 'Booking ( Order JT23-600-3427 )',
          //   points: { value: -12, isPending: false },
          //   date: '2019-07-23 23:56:08'
          // }, {
          //   source: 'Booking ( Order JT23-600-3427 )',
          //   points: { value: 7, isPending: true },
          //   date: '2019-07-23 23:56:08'
          // }
        ],
        resData:{}
      }
    },
    components: {
      ItemHeader
    },
    name: 'MyPoints',
    created(){
      this.tableInfo();
    },
    methods:{
      handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              console.log(this.currentPage)  //点击第几页
      },
      tableInfo(){
        this.$http.get(this.$api.viewPoint)
                .then((res)=>{
                    console.log(res);
                    this.resData = res.data.data;
                    this.tableData = res.data.data.pagination.currentResults;
                    this.pagesize = res.data.data.pagination.pageCount;
                })
      }

    }
  }
</script>

<style scoped>
  .my-points {
    flex: 1;
  }
  .content {
    padding-top: 4px;
  }
  .brief {
    width: 980px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #E9F1FA;
    padding: 26px 90px;
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
    font-size: 20px;
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
  }
  .detail {
    margin-left: 10px;
    margin-top: 40px;
  }
  .detail>.table-title {
    font-size: 20px;
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
    font-size: 20px;
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
    font-weight: bold;
  }
  .negtive {
    color: #0BA76E;
    font-weight: bold;
  }
  .pending {
    opacity: .5;
  }
  >>> .cell {
    position: relative;
  }
  .text-pending {
    font-size: 14px;
    color: #333;
    font-weight: normal;
    position: absolute;
    right: 0;
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
</style>
